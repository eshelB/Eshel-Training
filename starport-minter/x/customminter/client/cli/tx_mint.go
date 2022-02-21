package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/eshelB/Training/starport-minter/x/customminter/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdMint() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "mint [denomination] [quantity] [decimals] [receiving-address]",
		Short: "Broadcast message mint",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argName := args[0]
			argQuantity, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			argDecimals, err := strconv.ParseUint(args[2], 10, 32)
			if err != nil {
				return err
			}
			argDecimals32 := uint32(argDecimals)
			argReceivingAddress := args[3]

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgMint(
				clientCtx.GetFromAddress().String(),
				argName,
				argQuantity,
				argDecimals32,
				argReceivingAddress,
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
