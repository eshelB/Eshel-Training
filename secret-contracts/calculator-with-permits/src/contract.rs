use cosmwasm_std::{
    Api, Env, Extern, Querier, StdError, StdResult, Storage, HumanAddr, Binary, debug_print,
    to_binary, QueryResult, HandleResult, InitResult, InitResponse, HandleResponse
};

use crate::permit::{
    validate, Permission, Permit, // RevokedPermits,
};

use crate::msg::{
    Calculation, HandleMsg, InitMsg, QueryMsg,
    HandleAnswer, QueryAnswer, QueryWithPermit
};
use crate::state::{StoredCalculation, append_calculation, get_calculations};

pub fn init<S: Storage, A: Api, Q: Querier>(
    _deps: &mut Extern<S, A, Q>,
    env: Env,
    _msg: InitMsg,
) -> InitResult {
    debug_print!("Contract was initialized by {}", env.message.sender);
    Ok(InitResponse::default())
}

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> HandleResult {
    // let sender: HumanAddr = env.message.sender;
    // debug_print!("handle was by triggered by {}", sender);
    debug_print!("handle was by triggered");

    let res = match msg {
        HandleMsg::Add { calculation } => try_add(deps, env, calculation),
        HandleMsg::Sub { calculation } => try_sub(deps, env, calculation),
        HandleMsg::Mul { calculation } => try_mul(deps, env, calculation),
        HandleMsg::Div { calculation } => try_div(deps, env, calculation),
        HandleMsg::Sqrt { calculation } => try_sqrt(deps, env, calculation),
    };

    Ok(HandleResponse {
        messages: vec![],
        log: vec![],
        data: Some(to_binary(&res.unwrap())?),
    })
}

fn save_calculation<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    calculation: StoredCalculation,
    env: Env,
) -> StdResult<()>{
    let sender = deps.api.canonical_address(&env.message.sender)?;
    append_calculation(&mut deps.storage, &calculation, &sender)
}

fn try_sub<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: Calculation,
) -> StdResult<HandleAnswer> {
    let (left_operand, right_operand) = get_operands(calculation).unwrap();
    let result = left_operand - right_operand;

    let calculation = StoredCalculation {
        left_operand: left_operand,
        right_operand: Some(right_operand),
        operation: "Sub".as_bytes().to_vec(),
        result: result,
    };

    save_calculation(deps, calculation, env)?;

    debug_print("Sub: saved history successfully");
    Ok(HandleAnswer::SubAnswer { result })
}

fn try_mul<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: Calculation,
) -> StdResult<HandleAnswer> {
    let (left_operand, right_operand) = get_operands(calculation).unwrap();
    let result = left_operand * right_operand;

    let calculation = StoredCalculation {
        left_operand: left_operand,
        right_operand: Some(right_operand),
        operation: "Mul".as_bytes().to_vec(),
        result: result,
    };

    save_calculation(deps, calculation, env)?;

    debug_print("Mul: saved history successfully");
    Ok(HandleAnswer::MulAnswer { result })
}

fn try_div<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: Calculation,
) -> StdResult<HandleAnswer> {
    let (left_operand, right_operand) = get_operands(calculation).unwrap();
    let result = left_operand / right_operand;

    let calculation = StoredCalculation {
        left_operand: left_operand,
        right_operand: Some(right_operand),
        operation: "Div".as_bytes().to_vec(),
        result: result,
    };

    save_calculation(deps, calculation, env)?;

    debug_print("Div: saved history successfully");
    Ok(HandleAnswer::DivAnswer { result })
}

fn try_sqrt<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: Calculation,
) -> StdResult<HandleAnswer> {
    let radicand = match calculation {
        Calculation::BinaryCalculation {..} => return Err(StdError::GenericErr {
            msg: "This method should be called with one operand".to_string(),
            backtrace: None,
        }),
        Calculation::UnaryCalculation { operand } => operand,
    };

    // Maybe a better approach would have been to define the input as unsigned, but then
    // the UnaryCalculation either is not used, or becomes less generic
    if radicand < 0 {
        return Err(StdError::GenericErr {
            msg: "Radicand can't be negative on Sqrt operation".to_string(),
            backtrace: None,
        })
    }

    // square root rounds to the nearest integer to avoid floating point discrepancies
    // todo: maybe use cosmwasm_std::Decimal.sqrt() instead
    let result = (radicand as f64).sqrt() as u64;

    let calculation = StoredCalculation {
        left_operand: radicand,
        right_operand: None,
        operation: "Sqrt".as_bytes().to_vec(),
        result: result as i64,
    };

    save_calculation(deps, calculation, env)?;

    debug_print("Sqrt: saved history successfully");
    Ok(HandleAnswer::SqrtAnswer { result })
}

fn get_operands(binary_calculation: Calculation) -> StdResult<(i64, i64)> {
    match binary_calculation {
        Calculation::BinaryCalculation { left_operand, right_operand } => {
            Ok((left_operand, right_operand))
        },
        Calculation::UnaryCalculation { operand: _ } => return Err(StdError::GenericErr {
            msg: "This method should be called with two operands".to_string(),
            backtrace: None,
        }),
    }
}

fn try_add<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: Calculation,
) -> StdResult<HandleAnswer> {
    let (left_operand, right_operand) = get_operands(calculation).unwrap();
    let result = left_operand + right_operand;

    let debug_message = format!("performed {} + {} = {}", left_operand, right_operand, result);
    println!("macro print: {}", debug_message);
    debug_print(debug_message);

    let calculation = StoredCalculation {
        left_operand: left_operand,
        right_operand: Some(right_operand),
        operation: "Add".as_bytes().to_vec(),
        result: result,
    };

    save_calculation(deps, calculation, env)?;

    debug_print("Add: saved history successfully");
    Ok(HandleAnswer::AddAnswer { result })
}

pub fn query<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    msg: QueryMsg,
) -> QueryResult {
    match msg {
        QueryMsg::WithPermit { permit, query } => permit_queries(deps, permit, query),
    }
}

fn permit_queries<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    permit: Permit,
    query: QueryWithPermit,
) -> QueryResult {
    //todo use address from constructor
    let account = validate(deps, &"", &permit, HumanAddr("thisaddress".to_string()))?;

    match query {
        QueryWithPermit::CalculationHistory { page, page_size } => {
            // todo add permission, or if it's not extensible, find a way to use my own permissions
            if !permit.check_permission(&Permission::CalculationHistory) {
                return Err(StdError::generic_err(format!(
                    "No permission to query history, got permissions {:?}",
                    permit.params.permissions
                )));
            }

            query_calculation_history(deps, &account, page.unwrap_or(0), page_size)
        }
    }
}

pub fn query_calculation_history<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    account: &HumanAddr,
    page: u32,
    page_size: u32,
) -> StdResult<Binary> {
    let address = deps.api.canonical_address(account)?;
    let (calcs, total) = get_calculations(&deps.storage, &address, page, page_size)?;

    println!("the {:?} total calcs are: {:?}", total, calcs);
    to_binary(&QueryAnswer::CalculationHistory {
        calcs,
        total: Some(total),
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, from_binary};

    fn unpack_handle<S: Storage, A: Api, Q: Querier>(
        deps: &mut Extern<S, A, Q>,
        env: Env,
        msg: HandleMsg
    ) -> HandleAnswer {
        let res = handle(deps, env, msg).unwrap().data.unwrap();
        from_binary(&res).unwrap()
    }

    #[test]
    fn bad_permit() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        // invalid permit: the given signature signed chain_id="secret-4"
        let bad_permit = r#"{
            "params": {
                "permit_name":"test",
                "allowed_contracts": ["thisaddress"],
                "chain_id": "secret-5",
                "permissions": ["calculation_history"]
            },
            "signature": {
                "pub_key": {
                    "type": "tendermint/PubKeySecp256k1",
                    "value":"A31nYb+/VgwXsjhgmdkRotRexaDmgblDlhQja/rtEKwW"
                },
                "signature":"uHgywngtXSRaQcg4CFEJkExQN/VUgo7ul12zar/vwghtUiY3JPZQKPt7GpuV/WuDM94FRI4YuD7beA3w9JpnBA=="
            }
        }"#;

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&bad_permit).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: 3,
            }
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(_res) => assert!(false),
            StdResult::Err(e) => {
                // println!("{:?}", e);
                let expected_error = cosmwasm_std::StdError::GenericErr {
                    msg: "Failed to verify signatures for the given permit: IncorrectSignature".to_string(),
                    backtrace: None
                };
                assert_eq!(e, expected_error);
            }
        }
    }

    const PERMIT: &str = r#"{
        "params": {
            "permit_name":"test",
            "allowed_contracts": ["thisaddress"],
            "chain_id": "secret-4",
            "permissions": ["calculation_history"]
        },
        "signature": {
            "pub_key": {
                "type": "tendermint/PubKeySecp256k1",
                "value":"A31nYb+/VgwXsjhgmdkRotRexaDmgblDlhQja/rtEKwW"
            },
            "signature":"uHgywngtXSRaQcg4CFEJkExQN/VUgo7ul12zar/vwghtUiY3JPZQKPt7GpuV/WuDM94FRI4YuD7beA3w9JpnBA=="
        }
    }"#;

    #[test]
    fn add() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        // initial calculation history for an account should be unexistent
        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: 3,
            }
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer = serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(deserialized_result, QueryAnswer::CalculationHistory {
                    calcs: vec![],
                    total: Some(0),
                });
            },
            StdResult::Err(_e) => assert!(false)
        }

        let msg = HandleMsg::Add {
             calculation: Calculation::BinaryCalculation {
                 left_operand: 12,
                 right_operand: 30
             },
        };
        // it must be this key since that is who signed the previous query
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let res = unpack_handle(&mut deps, env, msg);
        match res {
            HandleAnswer::AddAnswer { result } => assert_eq!(result, 42),
            _ => assert!(false),
        };

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: 3,
            }
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer = serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(deserialized_result, QueryAnswer::CalculationHistory {
                    calcs: vec![StoredCalculation{
                        left_operand: 12,
                        right_operand: Some(30),
                        operation: "Add".as_bytes().to_vec(),
                        result: 42
                    }],
                    total: Some(1),
                });
            },
            StdResult::Err(_e) => assert!(false)
        }
    }

    #[test]
    fn sub() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = HandleMsg::Sub {
            calculation: Calculation::BinaryCalculation {
                left_operand: 123,
                right_operand: 300
            },
        };

        // it must be this key since that is who signed the query
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let res = unpack_handle(&mut deps, env, msg);
        match res {
            HandleAnswer::SubAnswer { result } => assert_eq!(result, -177),
            _ => assert!(false),
        };

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: 3,
            }
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer = serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(deserialized_result, QueryAnswer::CalculationHistory {
                    calcs: vec![StoredCalculation{
                        left_operand: 123,
                        right_operand: Some(300),
                        operation: "Sub".as_bytes().to_vec(),
                        result: -177
                    }],
                    total: Some(1),
                });
            },
            StdResult::Err(_e) => assert!(false)
        }
    }

    #[test]
    fn mul() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = HandleMsg::Mul {
            calculation: Calculation::BinaryCalculation {
                left_operand: 23,
                right_operand: 50
            },
        };

        // it must be this key since that is who signed the query
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let res = unpack_handle(&mut deps, env, msg);
        match res {
            HandleAnswer::MulAnswer { result } => assert_eq!(result, 1150),
            _ => assert!(false),
        };

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: 3,
            }
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer = serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(deserialized_result, QueryAnswer::CalculationHistory {
                    calcs: vec![StoredCalculation{
                        left_operand: 23,
                        right_operand: Some(50),
                        operation: "Mul".as_bytes().to_vec(),
                        result: 1150
                    }],
                    total: Some(1),
                });
            },
            StdResult::Err(_e) => assert!(false)
        }
    }

    #[test]
    fn div() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = HandleMsg::Div {
            calculation: Calculation::BinaryCalculation {
                left_operand: 23,
                right_operand: 50
            },
        };

        // it must be this key since that is who signed the query
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let res = unpack_handle(&mut deps, env, msg);
        match res {
            HandleAnswer::DivAnswer { result } => assert_eq!(result, 0),
            _ => assert!(false),
        };

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: 3,
            }
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer = serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(deserialized_result, QueryAnswer::CalculationHistory {
                    calcs: vec![StoredCalculation{
                        left_operand: 23,
                        right_operand: Some(50),
                        operation: "Div".as_bytes().to_vec(),
                        result: 0
                    }],
                    total: Some(1),
                });
            },
            StdResult::Err(_e) => assert!(false)
        }
    }

    #[test]
    fn sqrt() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let msg = HandleMsg::Sqrt {
            calculation: Calculation::UnaryCalculation {
                operand: 17,
            },
        };

        // it must be this key since that is who signed the query
        let env = mock_env("qcYLPHTmmt6mhJpcp3UN", &coins(2, "token"));
        let res = unpack_handle(&mut deps, env, msg);
        match res {
            HandleAnswer::SqrtAnswer { result } => assert_eq!(result, 4),
            _ => assert!(false),
        };

        let msg = QueryMsg::WithPermit {
            permit: serde_json::from_str(&PERMIT).unwrap(),
            query: QueryWithPermit::CalculationHistory {
                page: None,
                page_size: 3,
            }
        };

        let res = query(&mut deps, msg);
        match res {
            StdResult::Ok(raw_res) => {
                let response_string = String::from_utf8(raw_res.clone().into()).unwrap();
                let deserialized_result: QueryAnswer = serde_json::from_str(response_string.as_str()).unwrap();
                println!("the result is: {:?}", deserialized_result);
                assert_eq!(deserialized_result, QueryAnswer::CalculationHistory {
                    calcs: vec![StoredCalculation{
                        left_operand: 17,
                        right_operand: None,
                        operation: "Sqrt".as_bytes().to_vec(),
                        result: 4
                    }],
                    total: Some(1),
                });
            },
            StdResult::Err(_e) => assert!(false)
        }
    }
}
