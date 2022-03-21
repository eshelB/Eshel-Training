#![allow(unused_imports, unused_variables)] // todo remove warning allowance

use cosmwasm_std::{
    Api, Env, Extern, Querier, StdError, StdResult, Storage, CanonicalAddr,
    HumanAddr, Binary, debug_print, to_binary, QueryResult
};
use secret_toolkit::permit::{
    validate, Permission, Permit, RevokedPermits,
    PermitParams,
};

use crate::msg::{
    Calculation, HandleMsg, InitMsg, InitAnswer, QueryMsg,
    HandleAnswer, QueryAnswer, QueryWithPermit
};
use crate::state::{PREFIX_CALCULATION, StoredCalculation, save, append_calculation, get_calculations};

pub fn init<S: Storage, A: Api, Q: Querier>(
    _deps: &mut Extern<S, A, Q>,
    env: Env,
    _msg: InitMsg,
) -> StdResult<InitAnswer> {
    debug_print!("Contract was initialized by {}", env.message.sender);
    Ok(InitAnswer { })
}

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleAnswer> {
    // let sender: HumanAddr = env.message.sender;
    // debug_print!("handle was by triggered by {}", sender);
    debug_print!("handle was by triggered");

    match msg {
        HandleMsg::Add { calculation } => try_add(deps, env, calculation),
        HandleMsg::Sub { calculation } => try_sub(deps, env, calculation),
        HandleMsg::Mul { calculation } => try_mul(deps, env, calculation),
        HandleMsg::Div { calculation } => try_div(deps, env, calculation),
        HandleMsg::Sqrt { calculation } => try_sqrt(deps, env, calculation),
    }
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
    Ok(HandleAnswer::AddAnswer { result })
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
        Calculation::UnaryCalculation { operand } => return Err(StdError::GenericErr {
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

pub fn permit_queries<S: Storage, A: Api, Q: Querier>(
    deps: &Extern<S, A, Q>,
    permit: Permit,
    query: QueryWithPermit,
) -> QueryResult {
    let account = validate(deps, &"", &permit, HumanAddr("todo".to_string()))?;

    match query {
        QueryWithPermit::CalculationHistory { page, page_size } => {
            // todo add permission, or if it's not extensible, find a way to use my own permissions
            if !permit.check_permission(&Permission::History) {
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
    let (txs, total) = get_calculations(&deps.api, &deps.storage, &address, page, page_size)?;

    to_binary(&QueryAnswer::CalculationHistory {
        txs,
        total: Some(total),
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, from_binary, StdError};

    #[test]
    fn add() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        // initial calculation history for an account should be unexistent
        let permit = "";
        let msg = QueryMsg::WithPermit {
            permit: Permit {
                params: PermitParams {
                    allowed_tokens: Vec<HumanAddr>,
                    permit_name: String,
                    chain_id: String,
                    permissions: Vec<Permission>,
                },
                signature: PermitSignature {}
            },
            query: QueryWithPermit::CalculationHistory {
                page: Some(),
                page_size: u32,
            }
        };
        let env = mock_env("anyone", &coins(2, "token"));
        let res = handle(&mut deps, env, msg).unwrap();
        match res {
            HandleAnswer::TotalCalculationsAnswer { status, calculation_count } => {
                assert_eq!(status, "Successfully got the number of calculations by account".to_string());
                assert_eq!(calculation_count, 0);
            },
            _ => assert!(false),
        };

        // check add result
        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Add {
            calculation: Calculation::BinaryCalculation {
                left_operand: 3,
                right_operand: 4,
            }
        };
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::AddAnswer { result } => assert_eq!(result, 7),
            _ => panic!(),
        };

        // check that it was saved to history
        let msg = HandleMsg::StoredCalculation { index: 0 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::StoredCalculationAnswer { status, calculation } => {
                assert_eq!(status, "Calculation requested successfully".to_string());
                match calculation {
                    Some(calculation) => assert_eq!(calculation, StoredCalculation {
                        left_operand: 3,
                        right_operand: Some(4),
                        operation: "Add".as_bytes().to_vec(),
                        result: 7,
                    }),
                    None => assert!(false),
                }
            },
            _ => assert!(false),
        };

        // check history of unexisting index
        let msg = HandleMsg::StoredCalculation { index: 1 };
        let env = mock_env("anyone", &coins(2, "token"));
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::StoredCalculationAnswer { status, calculation } => {
                assert_eq!(calculation, None);
                assert_eq!(status, "No such calculation for user");
            },
            _ => assert!(false),
        };

        // check total calculations query
        let msg = HandleMsg::TotalCalculations { };
        let env = mock_env("anyone", &coins(2, "token"));
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::TotalCalculationsAnswer { status, calculation_count } => {
                assert_eq!(status, "Successfully got the number of calculations by account".to_string());
                assert_eq!(calculation_count, 1);
            },
            _ => assert!(false),
        };

        // once more, to check incrementation of count
        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Add {
            calculation: Calculation::BinaryCalculation {
                left_operand: 3,
                right_operand: -9,
            }
        };
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::AddAnswer { result } => assert_eq!(result, -6),
            _ => panic!(),
        };

        // check that it was saved to history
        let msg = HandleMsg::StoredCalculation { index: 1 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::StoredCalculationAnswer { status, calculation } => {
                assert_eq!(calculation.unwrap(), StoredCalculation {
                    left_operand: 3,
                    right_operand: Some(-9),
                    operation: "Add".as_bytes().to_vec(),
                    result: -6,
                });
            },
            _ => assert!(false),
        };

        // check total calculations query
        let msg = HandleMsg::TotalCalculations { };
        let env = mock_env("anyone", &coins(2, "token"));
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::TotalCalculationsAnswer { status, calculation_count } => {
                assert_eq!(status, "Successfully got the number of calculations by account".to_string());
                assert_eq!(calculation_count, 2);
            },
            _ => assert!(false),
        };
    }

    #[test]
    fn sub() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        // check sub result
        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Sub {
            calculation: Calculation::BinaryCalculation {
                left_operand: -3,
                right_operand: -1,
            }
        };
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::AddAnswer { result } => assert_eq!(result, -2),
            _ => panic!(),
        };

        // check that it was saved to history
        let msg = HandleMsg::StoredCalculation { index: 0 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::StoredCalculationAnswer { status, calculation } => {
                assert_eq!(calculation.unwrap(), StoredCalculation {
                    left_operand: -3,
                    right_operand: Some(-1),
                    operation: "Sub".as_bytes().to_vec(),
                    result: -2,
                });
            },
            _ => assert!(false),
        };

        // check history of unexisting index
        let msg = HandleMsg::StoredCalculation { index: 1 };
        let env = mock_env("anyone", &coins(2, "token"));
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::StoredCalculationAnswer { status, calculation } => {
                assert_eq!(status, "No such calculation for user");
                assert_eq!(calculation, None);
            },
            _ => assert!(false),
        };

        // check total calculations query
        let msg = HandleMsg::TotalCalculations { };
        let env = mock_env("anyone", &coins(2, "token"));
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::TotalCalculationsAnswer { status, calculation_count } => {
                assert_eq!(status, "Successfully got the number of calculations by account".to_string());
                assert_eq!(calculation_count, 1);
            },
            _ => assert!(false),
        };
    }

    #[test]
    fn mul() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Mul {
            calculation: Calculation::BinaryCalculation {
                left_operand: 3,
                right_operand: -4,
            }
        };
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::MulAnswer { result } => assert_eq!(result, -12),
            _ => panic!(),
        };

        // check that it was saved to history
        let msg = HandleMsg::StoredCalculation { index: 0 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::StoredCalculationAnswer { status, calculation } => {
                assert_eq!(calculation.unwrap(), StoredCalculation {
                    left_operand: 3,
                    right_operand: Some(-4),
                    operation: "Mul".as_bytes().to_vec(),
                    result: -12,
                });
            },
            _ => assert!(false),
        };
    }

    #[test]
    fn div() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        // check mul result
        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Div {
            calculation: Calculation::BinaryCalculation {
                left_operand: 7,
                right_operand: 3,
            }
        };
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::DivAnswer { result } => assert_eq!(result, 2),
            _ => panic!(),
        };

        // check that it was saved to history
        let msg = HandleMsg::StoredCalculation { index: 0 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::StoredCalculationAnswer { status, calculation } => {
                assert_eq!(calculation.unwrap(), StoredCalculation {
                    left_operand: 7,
                    right_operand: Some(3),
                    operation: "Div".as_bytes().to_vec(),
                    result: 2,
                });
            },
            _ => assert!(false),
        };
    }

    #[test]
    fn sqrt() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        // check sqrt result
        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Sqrt {
            calculation: Calculation::UnaryCalculation {
                operand: 37,
            }
        };
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::SqrtAnswer { result } => assert_eq!(result, 6),
            _ => panic!(),
        };

        // check that it was saved to history
        let msg = HandleMsg::StoredCalculation { index: 0 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::StoredCalculationAnswer { status, calculation } => {
                assert_eq!(status, "Calculation requested successfully".to_string());
                assert_eq!(calculation.unwrap(), StoredCalculation {
                    left_operand: 37,
                    right_operand: None,
                    operation: "Sqrt".as_bytes().to_vec(),
                    result: 6,
                });
            },
            _ => assert!(false),
        };
    }
}
