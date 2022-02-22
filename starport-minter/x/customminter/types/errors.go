package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/customminter module sentinel errors
var (
	ErrMintingCoins     = sdkerrors.Register(ModuleName, 1100, "Error during the Mint.")
	ErrInvalidRecipient = sdkerrors.Register(ModuleName, 1101, "Bad recipient Address.")
)
