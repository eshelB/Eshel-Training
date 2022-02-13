package calculator_test

import (
	"testing"

	keepertest "github.com/eshelB/Eshel-Training/calculator/testutil/keeper"
	"github.com/eshelB/Eshel-Training/calculator/testutil/nullify"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.CalculatorKeeper(t)
	calculator.InitGenesis(ctx, *k, genesisState)
	got := calculator.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
