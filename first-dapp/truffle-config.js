const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "violin avocado cloth ramp like false father wrist taxi connect kiwi system"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/00adaf9d869c45e49192966c456c1036")
      },
      network_id: 4,
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
