// todo remove unused
#![allow(unused_imports, unused_variables)]
// use cosmwasm_std::{debug_print, to_binary, Api, Binary, Env, Extern, HandleResponse, InitResponse, Querier, StdError, StdResult, Storage, HumanAddr};
use cosmwasm_std::{debug_print, Api, Env, Extern, Querier, StdError, StdResult, Storage};

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
        HandleMsg::Sub { calculation } => try_sub(deps, calculation),
        HandleMsg::Mul { calculation } => try_mul(deps, calculation),
        HandleMsg::Div { calculation } => try_div(deps, calculation),
        HandleMsg::Sqrt { calculation } => try_sqrt(deps, calculation),

        // HandleMsg::Sqrt { calculation } => try_sqrt(deps, calculation),

        // HandleMsg::GetPast { calculation } => try_sqrt(deps, calculation),

        // PastCalculation { index: i64 },
        // TotalCalculations { },

        // HandleMsg::Reset { count } => try_reset(deps, env, count),
    };

    Ok(result.unwrap())
}

pub fn try_sub<S: Storage, A: Api, Q: Querier>(
    _deps: &mut Extern<S, A, Q>,
    _calculation: Calculation,
) -> StdResult<HandleAnswer> {
    Ok(HandleAnswer::AddAnswer { result: 1 })
}

pub fn try_mul<S: Storage, A: Api, Q: Querier>(
    _deps: &mut Extern<S, A, Q>,
    _calculation: Calculation,
) -> StdResult<HandleAnswer> {
    Ok(HandleAnswer::AddAnswer { result: 1 })
}

pub fn try_div<S: Storage, A: Api, Q: Querier>(
    _deps: &mut Extern<S, A, Q>,
    _calculation: Calculation,
) -> StdResult<HandleAnswer> {
    Ok(HandleAnswer::AddAnswer { result: 1 })
}

pub fn try_sqrt<S: Storage, A: Api, Q: Querier>(
    _deps: &mut Extern<S, A, Q>,
    _calculation: Calculation,
) -> StdResult<HandleAnswer> {
    Ok(HandleAnswer::AddAnswer { result: 1 })
}

pub fn try_add<S: Storage, A: Api, Q: Querier>(
    deps: &mut Extern<S, A, Q>,
    env: Env,
    calculation: Calculation,
) -> StdResult<HandleAnswer> {
    // let left_operand = calculation.left_operand.i64(); // todo remove

    // todo maybe use a cleaner approach to unpack the calculation
    let (left_operand, right_operand) = match calculation {
        Calculation::BinaryCalculation { left_operand, right_operand } => {
            (left_operand, right_operand)
        },
        Calculation::UnaryCalculation { operand } => return Err(StdError::ParseErr {
            // todo verify what target is
            target: String::from("target"),
            msg: String::from("add should be called with two operands"),
            backtrace: None,
        }),
        // todo add status ("add should be called with two operands"),
    };

    let result = left_operand + right_operand;

    let debug_message = format!("performed {} + {} = {}", left_operand, right_operand, result);
    println!("macro print: {}", debug_message);
    debug_print(debug_message);

    let sender_address = deps.api.canonical_address(&env.message.sender)?;

    let stored_calculation = PastCalculation {
        left_operand: left_operand,
        right_operand: Some(right_operand),
        operation: "Add".as_bytes().to_vec(),
        result: result,
    };

    // save the calculation on the key: [sender's calculation_count] + [sender's address]
    let current_index: Option<u64> = None; //todo retrieve from storage

    // let user_stats_key = format!("{}{}", String::from(USER_STATS_PREFIX), &sender_address.to_string()).as_slice().to_vec();
    let user_stats_key = [USER_STATS_PREFIX, &sender_address.as_slice()].concat();
    println!("loading sender's state from key: {}", String::from_utf8(user_stats_key.clone()).unwrap());
    let user_stats: Option<UserStats> = may_load(&deps.storage, &user_stats_key).ok().unwrap();

    let current_count: u64 = match user_stats {
        Some(stats) => stats.calculation_count,
        None => 0,
    };

    let new_count = current_count + 1;

    let storage_key = format!("{}{}", current_count, &sender_address.to_string());
    println!("saving calculation to history on key: {}", storage_key);
    save(&mut deps.storage, &storage_key.as_slice().to_vec(), &stored_calculation)?;
    println!("saved calculation to history");

    println!("saving new user stats: count={}, on key: {}", new_count, user_stats_key);
    save(&mut deps.storage, &user_stats_key, &stored_calculation)?;
    println!("saved new user stats");

    debug_print("operation add saved history successfully");
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

        let msg = InitMsg {};
        let env = mock_env("creator", &coins(2, "token"));
        let _res = init(&mut deps, env, msg).unwrap();

        // anyone can add
        let env = mock_env("anyone", &coins(2, "token"));
        let msg = HandleMsg::Add {
            calculation: Calculation::BinaryCalculation {
                left_operand: 3,
                right_operand: 4,
            }
        };
        let _res = handle(&mut deps, env, msg).unwrap();
        let raw_result = match _res {
            HandleAnswer::AddAnswer { result } => result,
            _ => panic!(),
        };
        assert_eq!(raw_result, 7);


        let msg = HandleMsg::Add {
            calculation: Calculation::BinaryCalculation {
                left_operand: 3,
                right_operand: 4,
            }
        };

        // todo check that calculation was saved to the user's history
        // let env = mock_env("anyone", &coins(2, "token"));
        // let _res = handle(&mut deps, env, msg).unwrap();
        // let raw_result = match _res {
        //     HandleAnswer::AddAnswer { result } => result,
        //     _ => panic!(),
        // };
        // assert_eq!(raw_result, 7);
    }

    // #[test]
    // fn reset() {
    //     let mut deps = mock_dependencies(20, &coins(2, "token"));
    //
    //     let msg = InitMsg { count: 17 };
    //     let env = mock_env("creator", &coins(2, "token"));
    //     let _res = init(&mut deps, env, msg).unwrap();
    //
    //     // not anyone can reset
    //     let unauth_env = mock_env("anyone", &coins(2, "token"));
    //     let msg = HandleMsg::Reset { count: 5 };
    //     let res = handle(&mut deps, unauth_env, msg);
    //     match res {
    //         Err(StdError::Unauthorized { .. }) => {}
    //         _ => panic!("Must return unauthorized error"),
    //     }
    //
    //     // only the original creator can reset the counter
    //     let auth_env = mock_env("creator", &coins(2, "token"));
    //     let msg = HandleMsg::Reset { count: 5 };
    //     let _res = handle(&mut deps, auth_env, msg).unwrap();
    //
    //     // should now be 5
    //     let res = query(&deps, QueryMsg::GetCount {}).unwrap();
    //     let value: CountResponse = from_binary(&res).unwrap();
    //     assert_eq!(5, value.count);
    // }
}
