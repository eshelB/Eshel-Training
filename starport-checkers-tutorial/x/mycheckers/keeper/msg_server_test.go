package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/eshelB/my-checkers/testutil/keeper"
	"github.com/eshelB/my-checkers/x/mycheckers/keeper"
	"github.com/eshelB/my-checkers/x/mycheckers/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.MycheckersKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
