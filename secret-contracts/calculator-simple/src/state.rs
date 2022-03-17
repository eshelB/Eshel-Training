//todo remove warning allowance
#![allow(unused_imports, unused_variables)]
use std::{any::type_name};
use serde::{Deserialize, Serialize};
use serde::de::DeserializeOwned;
use schemars::JsonSchema;
use cosmwasm_std::{Storage, ReadonlyStorage, StdResult, StdError};
use secret_toolkit::serialization::{Bincode2, Serde};

pub static USER_STATS_PREFIX: &[u8] = b"user_stats";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct UserStats {
    pub calculation_count: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct PastCalculation {
    pub left_operand: i64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub right_operand: Option<i64>,
    pub operation: Vec<u8>,
    pub result: i64,
}

pub fn save<T: Serialize, S: Storage>(storage: &mut S, key: &[u8], value: &T) -> StdResult<()> {
    storage.set(key, &Bincode2::serialize(value)?);
    Ok(())
}

pub fn may_load<T: DeserializeOwned, S: ReadonlyStorage>(storage: &S, key: &[u8]) -> StdResult<Option<T>> {
    match storage.get(key) {
        Some(value) => Bincode2::deserialize(&value).map(Some),
        None => Ok(None),
    }
}
