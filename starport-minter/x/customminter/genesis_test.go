package customminter_test

import (
	"testing"

	keepertest "github.com/eshelB/Training/starport-minter/testutil/keeper"
	"github.com/eshelB/Training/starport-minter/testutil/nullify"
	"github.com/eshelB/Training/starport-minter/x/customminter"
	"github.com/eshelB/Training/starport-minter/x/customminter/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.CustomminterKeeper(t)
	customminter.InitGenesis(ctx, *k, genesisState)
	got := customminter.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
