//todo remove warning allowance
#![allow(unused_imports, unused_variables)]
use std::{any::type_name};
use serde::{Deserialize, Serialize};
use serde::de::DeserializeOwned;
use schemars::JsonSchema;
use cosmwasm_std::{Storage, ReadonlyStorage, StdResult, StdError, CanonicalAddr};
use cosmwasm_storage::PrefixedStorage;
use secret_toolkit::serialization::{Bincode2, Serde};
use secret_toolkit::storage::{AppendStore, AppendStoreMut};

pub static PREFIX_CALCULATION: &[u8] = b"calc";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct StoredCalculation {
    pub left_operand: i64,
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

fn append_calculation<S: Storage>(
    store: &mut S,
    calculation: &StoredCalculation,
    for_address: &CanonicalAddr,
) -> StdResult<()> {
    let mut store = PrefixedStorage::multilevel(&[PREFIX_CALCULATION, for_address.as_slice()], store);
    let mut store = AppendStoreMut::attach_or_create(&mut store)?;
    store.push(calculation)
}
