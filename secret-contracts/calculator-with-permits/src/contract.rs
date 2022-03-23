use cosmwasm_std::{
    debug_print, to_binary, Api, Binary, Env, Extern, HandleResponse, HandleResult, HumanAddr,
    InitResponse, InitResult, Querier, QueryResult, StdError, StdResult, Storage, Uint128,
};
use num_integer::Roots;

use crate::msg::{
    BinaryOp, HandleAnswer, HandleMsg, InitMsg, QueryAnswer, QueryMsg, QueryWithPermit, UnaryOp,
};
use crate::permit::{
    validate, // RevokedPermits,
    Permission,
    Permit,
};
use crate::state::{
    append_calculation, get_calculations, get_constants, set_constants, Constants,
    StoredCalculation,
};

pub fn init<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    _msg: InitMsg,
) -> InitResult {
    set_constants(
        &mut deps.storage,
        &Constants {
            contract_address: env.contract.address,
        },
    )?;
    Ok(InitResponse::default())
}

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> HandleResult {
    let res = match msg {
        HandleMsg::Add(calculation) => add(deps, env, calculation)?,
        HandleMsg::Sub(calculation) => sub(deps, env, calculation)?,
        HandleMsg::Mul(calculation) => mul(deps, env, calculation)?,
        HandleMsg::Div(calculation) => div(deps, env, calculation)?,
        HandleMsg::Sqrt(calculation) => sqrt(deps, env, calculation)?,
    };

    Ok(HandleResponse {
        messages: vec![],
        log: vec![],
        data: Some(to_binary(&res)?),
    })
}

fn save_calculation<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    calculation: StoredCalculation,
    env: Env,
) -> StdResult<()> {
    append_calculation(&mut deps.storage, &calculation, &env.message.sender)
}

fn add<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: BinaryOp,
) -> StdResult<HandleAnswer> {
    let (left_operand, right_operand) = (calculation.0, calculation.1);
    let result = Uint128::from(
        left_operand
            .u128()
            .checked_add(right_operand.u128())
            .ok_or_else(|| StdError::generic_err(format!("Overflow in Add operation")))?,
    );

    let calculation = StoredCalculation {
        left_operand,
        right_operand: Some(right_operand),
        operation: "Add".as_bytes().to_vec(),
        result,
    };

    save_calculation(deps, calculation, env)?;

    debug_print("Add: saved history successfully");
    Ok(HandleAnswer(result))
}

fn sub<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: BinaryOp,
) -> StdResult<HandleAnswer> {
    let (left_operand, right_operand) = (calculation.0, calculation.1);
    let result = Uint128::from(
        left_operand
            .u128()
            .checked_sub(right_operand.u128())
            .ok_or_else(|| StdError::generic_err(format!("Underflow in Sub operation")))?,
    );

    let calculation = StoredCalculation {
        left_operand,
        right_operand: Some(right_operand),
        operation: "Sub".as_bytes().to_vec(),
        result,
    };

    save_calculation(deps, calculation, env)?;

    debug_print("Sub: saved history successfully");
    Ok(HandleAnswer(result))
}

fn mul<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: BinaryOp,
) -> StdResult<HandleAnswer> {
    let (left_operand, right_operand) = (calculation.0, calculation.1);
    let result = Uint128::from(
        left_operand
            .u128()
            .checked_mul(right_operand.u128())
            .ok_or_else(|| StdError::generic_err(format!("Overflow in Mul operation")))?,
    );

    let calculation = StoredCalculation {
        left_operand,
        right_operand: Some(right_operand),
        operation: "Mul".as_bytes().to_vec(),
        result: Uint128::from(result),
    };

    save_calculation(deps, calculation, env)?;

    debug_print("Mul: saved history successfully");
    Ok(HandleAnswer(result))
}

fn div<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: BinaryOp,
) -> StdResult<HandleAnswer> {
    let (left_operand, right_operand) = (calculation.0, calculation.1);
    let result = Uint128::from(
        left_operand
            .u128()
            .checked_div(right_operand.u128())
            .ok_or_else(|| StdError::generic_err(format!("Underflow in Div operation")))?,
    );

    let calculation = StoredCalculation {
        left_operand,
        right_operand: Some(right_operand),
        operation: "Div".as_bytes().to_vec(),
        result,
    };

    save_calculation(deps, calculation, env)?;

    debug_print("Div: saved history successfully");
    Ok(HandleAnswer(result))
}

fn sqrt<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: UnaryOp,
) -> StdResult<HandleAnswer> {
    let radicand = calculation.0;

    let result = Uint128::from(radicand.u128().sqrt());

    let calculation = StoredCalculation {
        left_operand: radicand,
        right_operand: None,
        operation: "Sqrt".as_bytes().to_vec(),
        result,
    };

    save_calculation(deps, calculation, env)?;

    debug_print("Sqrt: saved history successfully");
    Ok(HandleAnswer(result))
}

pub fn query<S: Storage, A: Api, Q: Querier>(deps: &Extern<S, A, Q>, msg: QueryMsg) -> QueryResult {
    match msg {
        QueryMsg::WithPermit { permit, query } => permit_queries(deps, permit, query),
    }
}

fn permit_queries<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    permit: Permit,
    query: QueryWithPermit,
) -> QueryResult {
    let contract_address = get_constants(&deps.storage)?.contract_address;

    let account = validate(deps, "", &permit, contract_address)?;

    match query {
        QueryWithPermit::CalculationHistory { page, page_size } => {
            if !permit.check_permission(&Permission::CalculationHistory) {
                return Err(StdError::generic_err(format!(
                    "No permission to query history, got permissions {:?}",
                    permit.params.permissions
                )));
            }

            query_calculation_history(deps, &account, page.unwrap_or(Uint128::zero()), page_size)
        }
    }
}

pub fn query_calculation_history<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    account: &HumanAddr,
    page: Uint128,
    page_size: Uint128,
) -> StdResult<Binary> {
    let (calcs, total) = get_calculations(&deps.storage, &account, page, page_size)?;

    to_binary(&QueryAnswer::CalculationHistory {
        calcs,
        total: Some(total),
    })
}

#[cfg(test)]
mod tests {
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, from_binary};

    use super::*;

    fn unpack_handle<S: Storage, A: Api, Q: Querier>(
        deps: &mut Extern<S, A, Q>,
        env: Env,
        msg: HandleMsg,
    ) -> HandleAnswer {
        let res = handle(deps, env, msg).unwrap().data.unwrap();
        from_binary(&res).unwrap()
    }

    #[test]
    fn bad_permit() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        init(&mut deps, env, InitMsg {}).unwrap();

        // invalid permit: the given signature signed chain_id="secret-4"
        let bad_permit = r#"{
            "params": {
                "permit_name":"test",
                "allowed_contracts": ["cosmos2contract"],
                "chain_id": "secret-5",
                "permissions": ["calculation_history"]
            },
            "signature": {
                "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value":"A31nYb+/VgwXsjhgmdkRotRexaDmgblDlhQja/rtEKwW"
                },
                "signature":"QTVNw3CjT0wTRsPiWHpgZrP7lsDyzWFUv0qNLnhmptdRh0Kn40bGnmxqNapFQR4Iddd2B4kF1Vjyx1DM96sP+g=="
            }
        }"#;

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&bad_permit).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: Uint128(3),
            },
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(_res) => assert!(false),
            StdResult::Err(e) => {
                assert_eq!(
                    e,
                    StdError::generic_err(
                        "Failed to verify signatures for the given permit: IncorrectSignature",
                    )
                );
            }
        }
    }

    const PERMIT: &str = r#"{
        "params": {
            "permit_name":"test",
            "allowed_contracts": ["cosmos2contract"],
            "chain_id": "secret-4",
            "permissions": ["calculation_history"]
        },
        "signature": {
            "pub_key": {
                "type": "tendermint/PubKeySecp256k1",
                "value":"A31nYb+/VgwXsjhgmdkRotRexaDmgblDlhQja/rtEKwW"
            },
            "signature":"QTVNw3CjT0wTRsPiWHpgZrP7lsDyzWFUv0qNLnhmptdRh0Kn40bGnmxqNapFQR4Iddd2B4kF1Vjyx1DM96sP+g=="
        }
    }"#;

    #[test]
    fn add() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        init(&mut deps, env, InitMsg {}).unwrap();

        // initial calculation history for an account should be unexistent
        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: Uint128(3),
            },
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer =
                    serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(
                    deserialized_result,
                    QueryAnswer::CalculationHistory {
                        calcs: vec![],
                        total: Some(Uint128::zero()),
                    }
                );
            }
            StdResult::Err(e) => {
                println!("{:?}", e);
                assert!(false)
            }
        }

        let msg = HandleMsg::Add(BinaryOp(Uint128(12), Uint128(30)));

        // it must be this key since that is who signed the previous query
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let HandleAnswer(result) = unpack_handle(&mut deps, env, msg);
        assert_eq!(result, Uint128(42));

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: Uint128(3),
            },
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer =
                    serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(
                    deserialized_result,
                    QueryAnswer::CalculationHistory {
                        calcs: vec![StoredCalculation {
                            left_operand: Uint128(12),
                            right_operand: Some(Uint128(30)),
                            operation: "Add".as_bytes().to_vec(),
                            result: Uint128(42)
                        }],
                        total: Some(Uint128(1)),
                    }
                );
            }
            StdResult::Err(_e) => assert!(false),
        }
    }

    #[test]
    fn sub_underflow() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        init(&mut deps, env, InitMsg {}).unwrap();

        let msg = HandleMsg::Sub(BinaryOp(Uint128(23), Uint128(113)));

        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let res = handle(&mut deps, env, msg);
        match res {
            Err(e) => {
                println!("{:?}", e);
                assert_eq!(e, StdError::generic_err("Underflow in Sub operation"))
            }
            _ => assert!(false),
        };
    }

    #[test]
    fn sub() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        init(&mut deps, env, InitMsg {}).unwrap();

        let msg = HandleMsg::Sub(BinaryOp(Uint128(123), Uint128(13)));

        // it must be this key since that is who signed the query
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let HandleAnswer(result) = unpack_handle(&mut deps, env, msg);
        assert_eq!(result, Uint128(110));

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: Uint128(3),
            },
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer =
                    serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(
                    deserialized_result,
                    QueryAnswer::CalculationHistory {
                        calcs: vec![StoredCalculation {
                            left_operand: Uint128(123),
                            right_operand: Some(Uint128(13)),
                            operation: "Sub".as_bytes().to_vec(),
                            result: Uint128(110)
                        }],
                        total: Some(Uint128(1)),
                    }
                );
            }
            StdResult::Err(_e) => assert!(false),
        }
    }

    #[test]
    fn mul() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        init(&mut deps, env, InitMsg {}).unwrap();

        let msg = HandleMsg::Mul(BinaryOp(Uint128(23), Uint128(50)));

        // it must be this key since that is who signed the query
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let HandleAnswer(result) = unpack_handle(&mut deps, env, msg);
        assert_eq!(result, Uint128(1150));

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: Uint128(3),
            },
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer =
                    serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(
                    deserialized_result,
                    QueryAnswer::CalculationHistory {
                        calcs: vec![StoredCalculation {
                            left_operand: Uint128(23),
                            right_operand: Some(Uint128(50)),
                            operation: "Mul".as_bytes().to_vec(),
                            result: Uint128(1150)
                        }],
                        total: Some(Uint128(1)),
                    }
                );
            }
            StdResult::Err(e) => {
                println!("{:?}", e);
                assert!(false)
            }
        }
    }

    #[test]
    fn div() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        init(&mut deps, env, InitMsg {}).unwrap();

        let msg = HandleMsg::Div(BinaryOp(Uint128(23), Uint128(50)));

        // it must be this key since that is who signed the query
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let HandleAnswer(result) = unpack_handle(&mut deps, env, msg);
        assert_eq!(result, Uint128(0));

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: Uint128(3),
            },
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer =
                    serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(
                    deserialized_result,
                    QueryAnswer::CalculationHistory {
                        calcs: vec![StoredCalculation {
                            left_operand: Uint128(23),
                            right_operand: Some(Uint128(50)),
                            operation: "Div".as_bytes().to_vec(),
                            result: Uint128(0)
                        }],
                        total: Some(Uint128(1)),
                    }
                );
            }
            StdResult::Err(_e) => assert!(false),
        }
    }

    #[test]
    fn sqrt() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        init(&mut deps, env, InitMsg {}).unwrap();

        let msg = HandleMsg::Sqrt(UnaryOp(Uint128(17)));

        // it must be this key since that is who signed the query
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let HandleAnswer(result) = unpack_handle(&mut deps, env, msg);
        assert_eq!(result, Uint128(4));

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: Uint128(4),
            },
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer =
                    serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(
                    deserialized_result,
                    QueryAnswer::CalculationHistory {
                        calcs: vec![StoredCalculation {
                            left_operand: Uint128(17),
                            right_operand: None,
                            operation: "Sqrt".as_bytes().to_vec(),
                            result: Uint128(4)
                        }],
                        total: Some(Uint128(1)),
                    }
                );
            }
            StdResult::Err(_e) => assert!(false),
        }
    }
}
