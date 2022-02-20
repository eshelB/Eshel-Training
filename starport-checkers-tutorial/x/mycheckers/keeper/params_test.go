package keeper_test

import (
	"testing"

	testkeeper "github.com/eshelB/my-checkers/testutil/keeper"
	"github.com/eshelB/my-checkers/x/mycheckers/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.MycheckersKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
