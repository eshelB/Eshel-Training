use serde::{Deserialize, Serialize};
use serde::de::DeserializeOwned;
use schemars::JsonSchema;
use cosmwasm_std::{Storage, ReadonlyStorage, StdResult, CanonicalAddr};
use cosmwasm_storage::{PrefixedStorage, ReadonlyPrefixedStorage};
use secret_toolkit::serialization::{Bincode2, Serde};
use secret_toolkit::storage::{AppendStore, AppendStoreMut};

pub static PREFIX_CALCULATION: &[u8] = b"calc";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
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

pub fn append_calculation<S: Storage>(
    store: &mut S,
    calculation: &StoredCalculation,
    for_address: &CanonicalAddr,
) -> StdResult<()> {
    let mut store = PrefixedStorage::multilevel(&[PREFIX_CALCULATION, for_address.as_slice()], store);
    let mut store = AppendStoreMut::attach_or_create(&mut store)?;
    store.push(calculation)
}

pub fn get_calculations<S: ReadonlyStorage>(
    storage: &S,
    for_address: &CanonicalAddr,
    page: u32,
    page_size: u32,
) -> StdResult<(Vec<StoredCalculation>, u64)> {
    let store =
        ReadonlyPrefixedStorage::multilevel(&[PREFIX_CALCULATION, for_address.as_slice()], storage);

    // Try to access the storage of calculations for the account.
    // If it doesn't exist yet, return an empty list of calculations.
    let store = AppendStore::<StoredCalculation, _, _>::attach(&store);
    let store = if let Some(result) = store {
        result?
    } else {
        return Ok((vec![], 0));
    };

    // Take `page_size` txs starting from the latest tx, potentially skipping `page * page_size`
    // txs from the start.
    let calculations_iter = store
        .iter()
        .rev()
        .skip((page * page_size) as _)
        .take(page_size as _);

    let calculations: StdResult<Vec<StoredCalculation>> = calculations_iter.collect();

    // The `and_then` here flattens the `StdResult<StdResult<StoredCalculation>>` to an `StdResult<StoredCalculation>`
    // let calculations: StdResult<Vec<StoredCalculation>> = calculations_iter
    //     .map(|calc| calc.map(|calc| calc.into_humanized(api)).and_then(|x| x))
    //     .collect();
    calculations.map(|txs| (txs, store.len() as u64))
}
