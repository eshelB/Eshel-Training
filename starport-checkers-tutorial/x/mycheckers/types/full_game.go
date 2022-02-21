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

func (storedGame *StoredGame) GetPlayerAddress(color string) (address sdk.AccAddress, found bool, err error) {
	red, err := storedGame.GetRedPlayerAddress()
	if err != nil {
		return nil, false, err
	}
	black, err := storedGame.GetBlackPlayerAddress()
	if err != nil {
		return nil, false, err
	}
	address, found = map[string]sdk.AccAddress{
		rules.RED_PLAYER.Color:   red,
		rules.BLACK_PLAYER.Color: black,
	}[color]
	return address, found, nil
}

func (storedGame *StoredGame) GetWinnerAddress() (address sdk.AccAddress, found bool, err error) {
	address, found, err = storedGame.GetPlayerAddress(storedGame.Winner)

	return address, found, err
}

func (storedGame *StoredGame) GetWagerCoin() (wager sdk.Coin) {
	return sdk.NewCoin(sdk.DefaultBondDenom, sdk.NewInt(int64(storedGame.Wager)))
}
