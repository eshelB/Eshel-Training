package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/eshelB/Eshel-Training/calculator/testutil/keeper"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/keeper"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.CalculatorKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
