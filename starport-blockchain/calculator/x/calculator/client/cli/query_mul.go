package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdMul() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "mul",
		Short: "Query Mul",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryMulRequest{}

			res, err := queryClient.Mul(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
