package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/mycheckers module sentinel errors
var (
	ErrInvalidCreator   = sdkerrors.Register(ModuleName, 1100, "creator address is invalid: %s")
	ErrInvalidRed       = sdkerrors.Register(ModuleName, 1101, "red address is invalid: %s")
	ErrInvalidBlack     = sdkerrors.Register(ModuleName, 1102, "black address is invalid: %s")
	ErrGameNotParseable = sdkerrors.Register(ModuleName, 1103, "game cannot be parsed")

	ErrGameNotFound     = sdkerrors.Register(ModuleName, 1104, "no such game: %s")
	ErrCreatorNotPlayer = sdkerrors.Register(ModuleName, 1105, "message creator is not a player: %s")
	ErrNotPlayerTurn    = sdkerrors.Register(ModuleName, 1106, "player tried to play out of turn: %s")
	ErrWrongMove        = sdkerrors.Register(ModuleName, 1107, "wrong move")

	// note that 3 errors where omitted (probably game rejection)
	ErrGameFinished = sdkerrors.Register(ModuleName, 1108, "game is already finished")
)
var (
	ErrRedCannotPay            = sdkerrors.Register(ModuleName, 1109, "red cannot pay the wager")
	ErrBlackCannotPay          = sdkerrors.Register(ModuleName, 1110, "black cannot pay the wager")
	ErrCannotFindWinnerByColor = sdkerrors.Register(ModuleName, 1111, "the winner of the game is not in the available colors")
	ErrNothingToPay            = sdkerrors.Register(ModuleName, 1112, "there is nothing to pay, should not have been called")
	ErrCannotRefundWager       = sdkerrors.Register(ModuleName, 1113, "cannot refund wager to: %s")
	ErrCannotPayWinnings       = sdkerrors.Register(ModuleName, 1114, "cannot pay winnings to winner")
	ErrNotInRefundState        = sdkerrors.Register(ModuleName, 1115, "game is not in a state to refund, move count: %d")
)
