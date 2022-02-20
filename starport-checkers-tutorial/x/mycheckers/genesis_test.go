package mycheckers_test

import (
	"testing"

	keepertest "github.com/eshelB/my-checkers/testutil/keeper"
	"github.com/eshelB/my-checkers/testutil/nullify"
	"github.com/eshelB/my-checkers/x/mycheckers"
	"github.com/eshelB/my-checkers/x/mycheckers/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		NextGame: &types.NextGame{
			IdValue: 100,
		},
		StoredGameList: []types.StoredGame{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.MycheckersKeeper(t)
	mycheckers.InitGenesis(ctx, *k, genesisState)
	got := mycheckers.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.Equal(t, genesisState.NextGame, got.NextGame)
	require.ElementsMatch(t, genesisState.StoredGameList, got.StoredGameList)
	// this line is used by starport scaffolding # genesis/test/assert
}
