package keeper

import (
	"context"
	"fmt"
	"strconv"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
)

func (k msgServer) CalculateMul(goCtx context.Context, msg *types.MsgCalculateMul) (*types.MsgCalculateMulResponse, error) {
		ctx := sdk.UnwrapSDKContext(goCtx)

	_ = ctx

	floatX, err := strconv.ParseFloat(msg.X, 64)
	floatY, err := strconv.ParseFloat(msg.Y, 64)

	if err != nil {
		// todo: check if there's a better way to deal with parsing error
		fmt.Println("one of the inputs could not be converted to a float")
		return &types.MsgCalculateMulResponse{Result: "0"}, nil
	}

	// Calculate result
	result := fmt.Sprintf("%f", floatX * floatY)

	// Save last result into state
	// Get the store key for the last result
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.LastResultKey))

	// Convert the lastResultKey to bytes
	byteKey := []byte(types.LastResultKey)
	byteValue := []byte(result)

	// Set the value of last-result to result
	store.Set(byteKey, byteValue)

	return &types.MsgCalculateMulResponse{Result: result}, nil
}
