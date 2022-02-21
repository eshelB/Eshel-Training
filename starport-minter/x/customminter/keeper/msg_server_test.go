package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/eshelB/Training/starport-minter/testutil/keeper"
	"github.com/eshelB/Training/starport-minter/x/customminter/keeper"
	"github.com/eshelB/Training/starport-minter/x/customminter/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.CustomminterKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}
