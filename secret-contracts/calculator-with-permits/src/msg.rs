use cosmwasm_std::Uint128;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::permit::Permit;
use crate::state::StoredCalculation;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
// nothing to initialize in this contract
pub struct InitMsg {}

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
        page: Option<Uint128>,
        page_size: Uint128,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryAnswer {
    CalculationHistory {
        calcs: Vec<StoredCalculation>,
        total: Option<Uint128>,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Calculation {
    BinaryCalculation {
        left_operand: Uint128,
        right_operand: Uint128,
    },
    UnaryCalculation {
        operand: Uint128,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleAnswer {
    AddAnswer { result: Uint128 },
    SubAnswer { result: Uint128 },
    MulAnswer { result: Uint128 },
    DivAnswer { result: Uint128 },
    SqrtAnswer { result: Uint128 },
}
