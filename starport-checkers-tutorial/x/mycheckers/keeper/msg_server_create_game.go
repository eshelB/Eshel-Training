package keeper

import (
	"context"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/eshelB/my-checkers/x/mycheckers/rules"
	"github.com/eshelB/my-checkers/x/mycheckers/types"
	"strconv"
)

func (k msgServer) CreateGame(goCtx context.Context, msg *types.MsgCreateGame) (*types.MsgCreateGameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_ = ctx

	nextGame, found := k.Keeper.GetNextGame(ctx)

	if !found {
		panic("NextGame was not found")
	}

	newIndex := strconv.FormatUint(nextGame.IdValue, 10)

	storedGame := types.StoredGame{
		Creator: msg.Creator,
		Index:   newIndex,
		Game:    rules.New().String(),
		Red:     msg.Red,
		Black:   msg.Black,
	}

	// todo implement Validate()
	//err := storedGame.Validate()
	//if err != nil {
	//	return nil, err
	//}

	k.Keeper.SetStoredGame(ctx, storedGame)

	nextGame.IdValue++
	k.Keeper.SetNextGame(ctx, nextGame)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, "my-checkers"),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.StoredGameEventKey),
			sdk.NewAttribute(types.StoredGameEventCreator, msg.Creator),
			sdk.NewAttribute(types.StoredGameEventIndex, newIndex),
			sdk.NewAttribute(types.StoredGameEventRed, msg.Red),
			sdk.NewAttribute(types.StoredGameEventBlack, msg.Black),
		),
	)

	return &types.MsgCreateGameResponse{IdValue: newIndex}, nil
}
