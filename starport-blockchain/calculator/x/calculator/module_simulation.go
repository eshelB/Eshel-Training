package calculator

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"github.com/eshelB/Eshel-Training/calculator/testutil/sample"
	calculatorsimulation "github.com/eshelB/Eshel-Training/calculator/x/calculator/simulation"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = calculatorsimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgCalculateSum = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCalculateSum int = 100

	opWeightMsgCalculateMul = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCalculateMul int = 100

	opWeightMsgCalculateDiv = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCalculateDiv int = 100

	opWeightMsgCalculateSub = "op_weight_msg_create_chain"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCalculateSub int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	calculatorGenesis := types.GenesisState{
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&calculatorGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgCalculateSum int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCalculateSum, &weightMsgCalculateSum, nil,
		func(_ *rand.Rand) {
			weightMsgCalculateSum = defaultWeightMsgCalculateSum
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCalculateSum,
		calculatorsimulation.SimulateMsgCalculateSum(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgCalculateMul int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCalculateMul, &weightMsgCalculateMul, nil,
		func(_ *rand.Rand) {
			weightMsgCalculateMul = defaultWeightMsgCalculateMul
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCalculateMul,
		calculatorsimulation.SimulateMsgCalculateMul(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgCalculateDiv int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCalculateDiv, &weightMsgCalculateDiv, nil,
		func(_ *rand.Rand) {
			weightMsgCalculateDiv = defaultWeightMsgCalculateDiv
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCalculateDiv,
		calculatorsimulation.SimulateMsgCalculateDiv(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgCalculateSub int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCalculateSub, &weightMsgCalculateSub, nil,
		func(_ *rand.Rand) {
			weightMsgCalculateSub = defaultWeightMsgCalculateSub
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCalculateSub,
		calculatorsimulation.SimulateMsgCalculateSub(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
