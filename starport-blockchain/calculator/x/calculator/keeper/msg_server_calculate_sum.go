package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
)

func (k msgServer) CalculateSum(goCtx context.Context, msg *types.MsgCalculateSum) (*types.MsgCalculateSumResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.MsgCalculateSumResponse{Result: msg.X + msg.Y}, nil
}
