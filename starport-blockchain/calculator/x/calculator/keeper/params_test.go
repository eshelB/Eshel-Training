package keeper_test

import (
	"testing"

	testkeeper "github.com/eshelB/Eshel-Training/calculator/testutil/keeper"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.CalculatorKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
