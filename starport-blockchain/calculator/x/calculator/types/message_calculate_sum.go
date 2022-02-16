package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCalculateSum = "calculate_sum"

var _ sdk.Msg = &MsgCalculateSum{}

func NewMsgCalculateSum(creator string, x string, y string) *MsgCalculateSum {
	return &MsgCalculateSum{
		Creator: creator,
		X:       x,
		Y:       y,
	}
}

func (msg *MsgCalculateSum) Route() string {
	return RouterKey
}

func (msg *MsgCalculateSum) Type() string {
	return TypeMsgCalculateSum
}

func (msg *MsgCalculateSum) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCalculateSum) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCalculateSum) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
