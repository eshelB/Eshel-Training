package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/eshelB/Eshel-Training/calculator/x/calculator/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdCalculateMul() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "calculate-mul [x] [y]",
		Short: "Broadcast message calculateMul",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argX := args[0]
			argY := args[1]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgCalculateMul(
				clientCtx.GetFromAddress().String(),
				argX,
				argY,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
