package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgCalculateSum{}, "calculator/CalculateSum", nil)
	cdc.RegisterConcrete(&MsgCalculateMul{}, "calculator/CalculateMul", nil)
	cdc.RegisterConcrete(&MsgCalculateDiv{}, "calculator/CalculateDiv", nil)
	cdc.RegisterConcrete(&MsgCalculateSub{}, "calculator/CalculateSub", nil)
	// this line is used by starport scaffolding # 2
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCalculateSum{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCalculateMul{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCalculateDiv{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCalculateSub{},
	)
	// this line is used by starport scaffolding # 3

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
