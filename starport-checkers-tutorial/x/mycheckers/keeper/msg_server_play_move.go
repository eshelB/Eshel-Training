package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/eshelB/my-checkers/x/mycheckers/rules"
	"strconv"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/eshelB/my-checkers/x/mycheckers/types"
)

func (k msgServer) PlayMove(goCtx context.Context, msg *types.MsgPlayMove) (*types.MsgPlayMoveResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	ctx.GasMeter().ConsumeGas(types.PlayMoveGas, "Play a move")

	_ = ctx

	storedGame, found := k.GetStoredGame(ctx, msg.IdValue)
	if !found {
		return nil, sdkerrors.Wrapf(types.ErrGameNotFound, "game not found: %s", msg.IdValue)
	}

	// is game finished?
	if storedGame.Winner != rules.NO_PLAYER.Color {
		return nil, types.ErrGameFinished
	}

	// is expected player?
	var player rules.Player
	if strings.Compare(storedGame.Red, msg.Creator) == 0 {
		player = rules.RED_PLAYER
	} else if strings.Compare(storedGame.Black, msg.Creator) == 0 {
		player = rules.BLACK_PLAYER
	} else {
		return nil, types.ErrCreatorNotPlayer
	}

	game, err := storedGame.ParseGame()
	if err != nil {
		panic(err.Error())
	}

	if !game.TurnIs(player) {
		return nil, types.ErrNotPlayerTurn
	}

	// make valid move
	captured, moveErr := game.Move(
		rules.Pos{int(msg.FromX), int(msg.FromY)},
		rules.Pos{int(msg.ToX), int(msg.ToY)},
	)
	if moveErr != nil {
		return nil, types.ErrWrongMove
	}

	// update the game itself
	storedGame.Game = game.String()
	storedGame.Turn = game.Turn.Color
	storedGame.MoveCount++
	storedGame.Winner = game.Winner().Color

	// update the game in the fifo
	nextGame, found := k.Keeper.GetNextGame(ctx)
	if !found {
		panic("NextGame not found")
	}
	if storedGame.Winner == rules.NO_PLAYER.Color {
		k.Keeper.SendToFifoTail(ctx, &storedGame, &nextGame)
	} else {
		k.Keeper.RemoveFromFifo(ctx, &storedGame, &nextGame)
		k.Keeper.MustPayWinnings(ctx, &storedGame)
	}

	k.SetStoredGame(ctx, storedGame)
	k.Keeper.SetNextGame(ctx, nextGame)

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(sdk.EventTypeMessage,
			sdk.NewAttribute(sdk.AttributeKeyModule, "my-checkers"),
			sdk.NewAttribute(sdk.AttributeKeyAction, types.PlayMoveEventKey),
			sdk.NewAttribute(types.PlayMoveEventCreator, msg.Creator),
			sdk.NewAttribute(types.PlayMoveEventIdValue, msg.IdValue),
			sdk.NewAttribute(types.PlayMoveEventCapturedX, strconv.FormatInt(int64(captured.X), 10)),
			sdk.NewAttribute(types.PlayMoveEventCapturedY, strconv.FormatInt(int64(captured.Y), 10)),
			sdk.NewAttribute(types.PlayMoveEventWinner, game.Winner().Color),
		),
	)

	return &types.MsgPlayMoveResponse{
		IdValue:   msg.IdValue,
		CapturedX: int64(captured.X),
		CapturedY: int64(captured.Y),
		Winner:    game.Winner().Color,
	}, nil
}
