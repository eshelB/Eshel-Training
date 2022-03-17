use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use crate::state::PastCalculation;

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
    // PastCalculation { index: i64 },
    // TotalCalculations { },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
// no queries for this contract, only txs since we need the user's address to
// perform and read calculations
pub enum QueryMsg {}

// We define a custom struct for each query response
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum Calculation {
    BinaryCalculation {
        left_operand: i64,
        right_operand: i64,
    },
    UnaryCalculation {
        operand: i64,
        //todo maybe add padding
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
    PastCalculationAnswer {
        status: String,
        calculation: Option<PastCalculation>,
    },
    TotalCalculationsAnswer {
        status: String,
        calculation_count: Option<PastCalculation>,
    }
}

pub struct QueryAnswer {}
