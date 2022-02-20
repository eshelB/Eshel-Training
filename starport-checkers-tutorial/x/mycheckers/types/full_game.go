package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/eshelB/my-checkers/x/mycheckers/rules"
)

func (storedGame *StoredGame) GetCreatorAddress() (creator sdk.AccAddress, err error) {
	creator, errCreator := sdk.AccAddressFromBech32(storedGame.Creator)
	return creator, sdkerrors.Wrapf(errCreator, ErrInvalidCreator.Error(), storedGame.Creator)
}

func (storedGame *StoredGame) GetRedPlayerAddress() (redPlayer sdk.AccAddress, err error) {
	redPlayer, errRedPlayer := sdk.AccAddressFromBech32(storedGame.Red)
	return redPlayer, sdkerrors.Wrapf(errRedPlayer, ErrInvalidRed.Error(), storedGame.Creator)
}

func (storedGame *StoredGame) GetBlackPlayerAddress() (blackPlayer sdk.AccAddress, err error) {
	blackPlayer, errBlackPlayer := sdk.AccAddressFromBech32(storedGame.Black)
	return blackPlayer, sdkerrors.Wrapf(errBlackPlayer, ErrInvalidBlack.Error(), storedGame.Creator)
}

func (storedGame *StoredGame) ParseGame() (game *rules.Game, err error) {
	game, errGame := rules.Parse(storedGame.Game)
	if err != nil {
		return game, sdkerrors.Wrapf(errGame, ErrGameNotParseable.Error())
	}
	game.Turn = rules.Player{
		Color: storedGame.Turn,
	}
	return game, nil
}
