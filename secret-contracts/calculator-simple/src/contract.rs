// todo remove unused
#![allow(unused_imports, unused_variables)]
// use cosmwasm_std::{debug_print, to_binary, Api, Binary, Env, Extern, HandleResponse, InitResponse, Querier, StdError, StdResult, Storage, HumanAddr};
use cosmwasm_std::{debug_print, Api, Env, Extern, Querier, StdError, StdResult, Storage, CanonicalAddr};

use crate::msg::{Calculation, HandleMsg, InitMsg, InitAnswer, QueryMsg, HandleAnswer, QueryAnswer};
use crate::state::{save, may_load, UserStats, PastCalculation, USER_STATS_PREFIX};

pub fn init<S: Storage, A: Api, Q: Querier>(
    _deps: &mut Extern<S, A, Q>,
    env: Env,
    _msg: InitMsg,
) -> StdResult<InitAnswer> {
    debug_print!("Contract was initialized by {}", env.message.sender);
    Ok(InitAnswer{ })
}

pub fn handle<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    msg: HandleMsg,
) -> StdResult<HandleAnswer> {
    // let sender: HumanAddr = env.message.sender;
    // debug_print!("handle was by triggered by {}", sender);
    debug_print!("handle was by triggered");

    let result = match msg {
        HandleMsg::Add { calculation } => try_add(deps, env, calculation),
        HandleMsg::Sub { calculation } => try_sub(deps, env, calculation),
        HandleMsg::Mul { calculation } => try_mul(deps, env, calculation),
        HandleMsg::Div { calculation } => try_div(deps, env, calculation),
        HandleMsg::Sqrt { calculation } => try_sqrt(deps, env, calculation),
        HandleMsg::PastCalculation { index } => try_past_calculation(deps, env, index),
        HandleMsg::TotalCalculations { } => try_total_calculations(deps, env),
    };

    result
}

fn try_total_calculations<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
) -> StdResult<HandleAnswer> {
    let sender_address = deps.api.canonical_address(&env.message.sender)?;

    let user_stats_key = [USER_STATS_PREFIX, &sender_address.as_slice()].concat();
    println!("loading sender's stats from key: {}", String::from_utf8(user_stats_key.clone()).unwrap());
    let user_stats: Option<UserStats> = may_load(&deps.storage, &user_stats_key).ok().unwrap();

    Ok(HandleAnswer::TotalCalculationsAnswer {
        status: "Successfully got the number of calculations by account".to_string(),
        calculation_count: match user_stats {
            Some(stats) => stats.calculation_count,
            None => 0,
        },
    })
}

fn try_past_calculation<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    requested_index: u64,
) -> StdResult<HandleAnswer> {
    let sender_address = deps.api.canonical_address(&env.message.sender)?;
    let storage_key = [requested_index.to_string().as_bytes(), sender_address.as_slice()].concat();
    // println!("loading calculation from history with key: {:?}", String::from_utf8(storage_key.clone()).unwrap());
    let calculation_stored: Option<PastCalculation> = may_load(&deps.storage, &storage_key)?;
    // let calculation_found = calculation_stored.unwrap();

    match calculation_stored {
        Some(calculation) => {
            println!("got calculation from history");
            Ok(HandleAnswer::PastCalculationAnswer {
                status: "Calculation requested successfully".to_string(),
                calculation: Some(calculation),
            })
        }
        None => Ok(HandleAnswer::PastCalculationAnswer {
            status: "No such calculation for user".to_string(),
            calculation: None,
        })
    }
}

fn save_calculation<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    calculation: PastCalculation,
    env: Env,
) -> StdResult<()>{
    let sender_address = deps.api.canonical_address(&env.message.sender)?;

    // save the calculation on the key: [sender's calculation_count] + [sender's address]
    let user_stats_key = [USER_STATS_PREFIX, &sender_address.as_slice()].concat();
    println!("loading sender's stats from key: {}", String::from_utf8(user_stats_key.clone()).unwrap());
    let user_stats: Option<UserStats> = may_load(&deps.storage, &user_stats_key).unwrap();

    let current_count: u64 = match user_stats {
        Some(stats) => stats.calculation_count,
        None => 0,
    };

    let new_count = current_count + 1;

    let storage_key = [current_count.to_string().as_bytes(), sender_address.as_slice()].concat();
    println!("saving calculation to history on key: {:?}", String::from_utf8(storage_key.clone()).unwrap());
    // let storage_key_bytes: Vec<u8> = storage_key.as_slice().to_vec();
    save(&mut deps.storage, &storage_key.as_slice().to_vec(), &calculation)?;
    println!("saved calculation to history");

    println!("saving new user stats: count={}, on key: {:?}", new_count, String::from_utf8(user_stats_key.clone()).unwrap());
    save(&mut deps.storage, &user_stats_key, &new_count)
}

fn try_sub<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: Calculation,
) -> StdResult<HandleAnswer> {
    let (left_operand, right_operand) = get_operands(calculation).unwrap();
    let result = left_operand - right_operand;

    let calculation = PastCalculation {
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

    let calculation = PastCalculation {
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

    let calculation = PastCalculation {
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

    if radicand < 0 {
        return Err(StdError::GenericErr {
            msg: "Radicand can't be negative on Sqrt operation".to_string(),
            backtrace: None,
        })
    }

    // square root rounds to the nearest integer to avoid floating point discrepancies
    let result = (radicand as f64).sqrt() as u64;

    let calculation = PastCalculation {
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

    let calculation = PastCalculation {
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
    _deps: &Extern<S, A, Q>,
    _msg: QueryMsg,
) -> StdResult<QueryAnswer> {
    // no queries in simple implementation of this contract
    Ok(QueryAnswer {})
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env};
    use cosmwasm_std::{coins, from_binary, StdError};

    #[test]
    fn add() {
        let mut deps = mock_dependencies(20, &coins(2, "token"));

        // initial calculation count for account should be 0
        let msg = HandleMsg::TotalCalculations { };
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
        let msg = HandleMsg::PastCalculation { index: 0 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::PastCalculationAnswer { status, calculation } => {
                assert_eq!(status, "Calculation requested successfully".to_string());
                match calculation {
                    Some(calculation) => assert_eq!(calculation, PastCalculation {
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
        let msg = HandleMsg::PastCalculation { index: 1 };
        let env = mock_env("anyone", &coins(2, "token"));
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::PastCalculationAnswer { status, calculation } => {
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
        let msg = HandleMsg::PastCalculation { index: 1 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::PastCalculationAnswer { status, calculation } => {
                assert_eq!(calculation.unwrap(), PastCalculation {
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
        let msg = HandleMsg::PastCalculation { index: 0 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::PastCalculationAnswer { status, calculation } => {
                assert_eq!(calculation.unwrap(), PastCalculation {
                    left_operand: -3,
                    right_operand: Some(-1),
                    operation: "Sub".as_bytes().to_vec(),
                    result: -2,
                });
            },
            _ => assert!(false),
        };

        // check history of unexisting index
        let msg = HandleMsg::PastCalculation { index: 1 };
        let env = mock_env("anyone", &coins(2, "token"));
        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::PastCalculationAnswer { status, calculation } => {
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
        let msg = HandleMsg::PastCalculation { index: 0 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::PastCalculationAnswer { status, calculation } => {
                assert_eq!(calculation.unwrap(), PastCalculation {
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
        let msg = HandleMsg::PastCalculation { index: 0 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::PastCalculationAnswer { status, calculation } => {
                assert_eq!(calculation.unwrap(), PastCalculation {
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
        let msg = HandleMsg::PastCalculation { index: 0 };
        let env = mock_env("anyone", &coins(2, "token"));

        let _res = handle(&mut deps, env, msg).unwrap();
        match _res {
            HandleAnswer::PastCalculationAnswer { status, calculation } => {
                assert_eq!(status, "Calculation requested successfully".to_string());
                assert_eq!(calculation.unwrap(), PastCalculation {
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
