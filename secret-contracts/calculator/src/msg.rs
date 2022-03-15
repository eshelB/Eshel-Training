use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use crate::state::PastCalculation;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
// nothing to initialize in this contract
pub struct InitMsg { }

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum HandleMsg {
    Add { calculation: Calculation::BinaryCalculation },
    Sub { calculation: Calculation::BinaryCalculation },
    Mul { calculation: Calculation::BinaryCalculation },
    Div { calculation: Calculation::BinaryCalculation },
    Sqrt { calculation: Calculation::UnaryCalculation },
    GetPastCalculation { index: u64 }
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
        left_operand: u64,
        right_operand: u64,
    },
    UnaryCalculation {
        operand: u64,
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
    GetPastCalculationAnswer {
        status: String,
        calculation: Option<PastCalculation>,
    }
}
