package simulation

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/keeper"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
)

func SimulateMsgCalculateDiv(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgCalculateDiv{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the CalculateDiv simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "CalculateDiv simulation not implemented"), nil, nil
	}
}
