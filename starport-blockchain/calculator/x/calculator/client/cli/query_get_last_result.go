package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdGetLastResult() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "get-last-result",
		Short: "Query getLastResult",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryGetLastResultRequest{}

			res, err := queryClient.GetLastResult(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
