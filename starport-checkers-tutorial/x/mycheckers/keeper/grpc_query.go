package keeper

import (
	"github.com/eshelB/my-checkers/x/mycheckers/types"
)

var _ types.QueryServer = Keeper{}
