package keeper

import (
	"context"
	"fmt"
	"strconv"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetLastResult(goCtx context.Context, req *types.QueryGetLastResultRequest) (*types.QueryGetLastResultResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	_ = ctx

	// get last result store
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.LastResultKey))

	// Convert the lastResultKey to bytes
	byteKey := []byte(types.LastResultKey)

	// Set the value of last-result to result
	bytes := store.Get(byteKey)

	// Return zero if the last result is not found (for example, if no calculation has been done yet)
	if bytes == nil {
		fmt.Println("there was a problem getting the last result from the store")
		return &types.QueryGetLastResultResponse{Result: 0}, nil
	}

	// convert last result to float64
	str := string(bytes)
	lastResult, err := strconv.ParseFloat(str, 64)

	if err != nil {
		fmt.Println("the last result could not be read as a float")
		return &types.QueryGetLastResultResponse{Result: 0}, nil
	}

	return &types.QueryGetLastResultResponse{Result: lastResult}, nil
}
