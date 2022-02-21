package keeper_test

import (
	"testing"

	testkeeper "github.com/eshelB/Training/starport-minter/testutil/keeper"
	"github.com/eshelB/Training/starport-minter/x/customminter/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.CustomminterKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
