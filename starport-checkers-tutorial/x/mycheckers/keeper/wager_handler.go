package keeper

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/eshelB/my-checkers/x/mycheckers/types"
)

func (k *Keeper) CollectWager(ctx sdk.Context, storedGame *types.StoredGame) error {
	// todo set up movecount
	//if storedGame.MoveCount == 0 {
	//	// Black plays first
	//} else if storedGame.MoveCount == 1 {
	//	// Red plays second
	//}

	// for now, only black pays the wager
	black, err := storedGame.GetBlackPlayerAddress()
	if err != nil {
		panic(err.Error())
	}

	err = k.bank.SendCoinsFromAccountToModule(ctx, black, types.ModuleName, sdk.NewCoins(storedGame.GetWagerCoin()))
	if err != nil {
		return sdkerrors.Wrapf(err, types.ErrBlackCannotPay.Error())
	}

	return nil
}

func (k *Keeper) MustPayWinnings(ctx sdk.Context, storedGame *types.StoredGame) {
	winnerAddress, found, err := storedGame.GetWinnerAddress()
	if err != nil {
		panic(err.Error())
	}
	if !found {
		panic(fmt.Sprintf(types.ErrCannotFindWinnerByColor.Error(), storedGame.Winner))
	}

	winnings := storedGame.GetWagerCoin()
	if storedGame.MoveCount == 0 {
		panic(types.ErrNothingToPay.Error())
	} else if 1 < storedGame.MoveCount {
		winnings = winnings.Add(winnings)
	}

	err = k.bank.SendCoinsFromModuleToAccount(ctx, types.ModuleName, winnerAddress, sdk.NewCoins(winnings))
	if err != nil {
		panic(types.ErrCannotPayWinnings.Error())
	}
}

func (k *Keeper) MustRefundWager(ctx sdk.Context, storedGame *types.StoredGame) {
	// todo deal with rejection
}
