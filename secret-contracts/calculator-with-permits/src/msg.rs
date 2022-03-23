use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cosmwasm_std::Binary;
use crate::state::StoredCalculation;
use crate::permit::Permit;

pub type QueryResponse = Binary;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
// nothing to initialize in this contract
pub struct InitMsg { }
pub struct InitAnswer { }

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
    Add { calculation: Calculation },
    Sub { calculation: Calculation },
    Mul { calculation: Calculation },
    Div { calculation: Calculation },
    Sqrt { calculation: Calculation },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    WithPermit {
        permit: Permit,
        query: QueryWithPermit,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryWithPermit {
    CalculationHistory {
        page: Option<u32>,
        page_size: u32,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryAnswer {
    CalculationHistory {
        calcs: Vec<StoredCalculation>,
        total: Option<u64>,
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Calculation {
    BinaryCalculation {
        left_operand: i64,
        right_operand: i64,
    },
    UnaryCalculation {
        operand: i64,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleAnswer {
    AddAnswer { result: i64 },
    SubAnswer { result: i64 },
    MulAnswer { result: i64 },
    DivAnswer { result: i64 },
    SqrtAnswer { result: u64 },
}
