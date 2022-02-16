package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCalculateMul = "calculate_mul"

var _ sdk.Msg = &MsgCalculateMul{}

func NewMsgCalculateMul(creator string, x string, y string) *MsgCalculateMul {
	return &MsgCalculateMul{
		Creator: creator,
		X:       x,
		Y:       y,
	}
}

func (msg *MsgCalculateMul) Route() string {
	return RouterKey
}

func (msg *MsgCalculateMul) Type() string {
	return TypeMsgCalculateMul
}

func (msg *MsgCalculateMul) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCalculateMul) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCalculateMul) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
