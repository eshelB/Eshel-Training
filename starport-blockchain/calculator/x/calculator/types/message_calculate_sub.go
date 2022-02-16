package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCalculateSub = "calculate_sub"

var _ sdk.Msg = &MsgCalculateSub{}

func NewMsgCalculateSub(creator string, x string, y string) *MsgCalculateSub {
	return &MsgCalculateSub{
		Creator: creator,
		X:       x,
		Y:       y,
	}
}

func (msg *MsgCalculateSub) Route() string {
	return RouterKey
}

func (msg *MsgCalculateSub) Type() string {
	return TypeMsgCalculateSub
}

func (msg *MsgCalculateSub) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCalculateSub) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCalculateSub) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
