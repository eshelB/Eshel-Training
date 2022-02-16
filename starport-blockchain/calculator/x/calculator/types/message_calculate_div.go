package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgCalculateDiv = "calculate_div"

var _ sdk.Msg = &MsgCalculateDiv{}

func NewMsgCalculateDiv(creator string, x string, y string) *MsgCalculateDiv {
	return &MsgCalculateDiv{
		Creator: creator,
		X:       x,
		Y:       y,
	}
}

func (msg *MsgCalculateDiv) Route() string {
	return RouterKey
}

func (msg *MsgCalculateDiv) Type() string {
	return TypeMsgCalculateDiv
}

func (msg *MsgCalculateDiv) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgCalculateDiv) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCalculateDiv) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
