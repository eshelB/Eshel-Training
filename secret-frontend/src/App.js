import React, { Component } from "react";
import {Wallet, SecretNetworkClient, MsgExecuteContract, EncryptionUtils, EncryptionUtilsImpl} from "secretjs";

import "./App.css";

const CONTRACT_ADDRESS = "secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg";
const CONTRACT_HASH = "1a573176d7eab70777a86241c5ac29aa5093d2536a74a41723ed918167f46281";

class Input extends Component {
  render() {
    return (
      <div className="Input">
        <form>
          <label>
            operand {this.props.label}: &emsp;
            <input type="number" name="numform" onChange={this.props.onchange} value={this.props.value}/>
          </label>
        </form>
      </div>
    );
  }
}

class History extends Component {
  state = { calcs: null, total: null };

  componentDidMount = async () => {
    try {
      const result = await this.props.secretjs.query.compute.queryContract({
        address: CONTRACT_ADDRESS,
        codeHash: CONTRACT_HASH,
        query: {
          with_permit: {
            query: {calculation_history: {page_size: "3"}},
            permit: {
              params: {
                permit_name: "test",
                allowed_tokens: ["secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg"],
                chain_id: "secret-4",
                permissions: ["calculation_history"]
              },
              signature: {
                pub_key: {type: "tendermint/PubKeySecp256k1", value: "A07oJJ9n4TYTnD7ZStYyiPbB3kXOZvqIMkchGmmPRAzf"},
                signature: "VsJH5a0qAwfxHihiPsehLCYmzq+69xrqDSYLKuiJPt06GKXt7jckdpHjdzhk8ChLoJpIqCHwWJOVgLQfeCQArg=="
              }
            }
          }
        },
      });

      console.log(result);
      this.setState({ calcs: result.calculation_history.calcs, total: parseInt(result.calculation_history.total) });
      console.log("state:", this.state);
    } catch (e){
      console.error("error loading history of calculations", e)
    }
  }

  render() {
    if (!this.state.calcs) {
      return <div>Loading History...</div>;
    }

    console.log("result from history component:", this.props.result);
    const listItems = this.state.total ?
      this.state.calcs.map(calculation => <li>{calculation}</li>) :
      <li>No calculations for this address</li>;

    return (
      <div className="History">
        <p>
          History of calculations:
        </p>
        <ul className="b">
          {listItems}
        </ul>
      </div>
    );
  }
}

class MathButton extends Component {
    render() {
        return (
            <div className="MathButton">
                <label>
                    <button onClick={this.props.onclick}>
                        {this.props.label}
                    </button>
                </label>
            </div>
        );
    }
}

class App extends Component {
  state = { firstOperand: 0, secondOperand: 0, result: 0, web3: null, accounts: null, contract: null, secretjs: null, myAddress: null };

  componentDidMount = async () => {
    try {
      console.log("attempting to connect to scrt-network via ", process.env.REACT_APP_GRPC_WEB_URL);

      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      while (
        !window.keplr ||
        !window.getEnigmaUtils ||
        !window.getOfflineSignerOnlyAmino
      ) {
        await sleep(100);
      }

      const CHAIN_ID = "secretdev-1";
      // const CHAIN_ID = "pulsar-2";

      await window.keplr.experimentalSuggestChain({
        chainId: CHAIN_ID,
        chainName: "Local Secret Chain",
        rpc: "http://localhost:26657",
        rest: "http://localhost:1337",
        bip44: {
          coinType: 529,
        },
        coinType: 529,
        stakeCurrency: {
          coinDenom: "SCRT",
          coinMinimalDenom: "uscrt",
          coinDecimals: 6,
        },
        bech32Config: {
          bech32PrefixAccAddr: "secret",
          bech32PrefixAccPub: "secretpub",
          bech32PrefixValAddr: "secretvaloper",
          bech32PrefixValPub: "secretvaloperpub",
          bech32PrefixConsAddr: "secretvalcons",
          bech32PrefixConsPub: "secretvalconspub",
        },
        currencies: [
          {
            coinDenom: "SCRT",
            coinMinimalDenom: "uscrt",
            coinDecimals: 6,
          },
        ],
        feeCurrencies: [
          {
            coinDenom: "SCRT",
            coinMinimalDenom: "uscrt",
            coinDecimals: 6,
          },
        ],
        gasPriceStep: {
          low: 0.1,
          average: 0.25,
          high: 0.4,
        },
        features: ["secretwasm", "stargate", "ibc-go", "ibc-transfer"],
      });

      let keplrOfflineSigner;
      try {
        await window.keplr.enable(CHAIN_ID);
        keplrOfflineSigner = window.getOfflineSignerOnlyAmino(CHAIN_ID);
      } catch (e) {
        console.log("keplr is not configured to work with ", CHAIN_ID);
      }
      // const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
      // console.log("my address is:", myAddress);

      const wallet = new Wallet(
        "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
      );
      const myAddress = wallet.address;

      const secretjs = await SecretNetworkClient.create({
        grpcWebUrl: process.env.REACT_APP_GRPC_WEB_URL,
        chainId: CHAIN_ID,
        wallet,
        // wallet: keplrOfflineSigner,
        walletAddress: myAddress,
        encryptionUtils: window.getEnigmaUtils(CHAIN_ID),
      });
      console.log("created secret client");

      // const result = await secretjs.query.compute.queryContract({
      //   address: CONTRACT_ADDRESS,
      //   codeHash: CONTRACT_HASH,
      //   query: {
      //     with_permit: {
      //       query: { calculation_history: { page_size: "3" }},
      //       permit: {
      //         params: {
      //           permit_name: "test",
      //           allowed_tokens: ["secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg"],
      //           chain_id: "secret-4",
      //           permissions: ["calculation_history"]
      //         },
      //         signature: {
      //           pub_key: {type: "tendermint/PubKeySecp256k1", value: "A31nYb+/VgwXsjhgmdkRotRexaDmgblDlhQja/rtEKwW"},
      //           signature: "VsJH5a0qAwfxHihiPsehLCYmzq+69xrqDSYLKuiJPt06GKXt7jckdpHjdzhk8ChLoJpIqCHwWJOVgLQfeCQArg=="
      //         }
      //       }
      //     }
      //   },
      // });
      //
      // console.log(result);

      document.title = "Secret Calculator";

      // todo set correct state
      this.setState({ web3: undefined, accounts: undefined, contract: undefined, result: 0, secretjs, myAddress });
    } catch (error) {
      alert(`Failed to connect to secret network. Check console for details.`);
      console.error(error);
    }
  };

  getOperation = (functionName) => {
    const result = async () => {
      let { firstOperand, secondOperand } = this.state;
      [ firstOperand, secondOperand ] = [ firstOperand.toString(), secondOperand.toString() ];
      console.log(`calling ${functionName} function with operands:`, firstOperand, secondOperand);

      let tx;
      try {
        console.log(`sending ${functionName} tx from`, this.state.myAddress);
        const calculationMessage = new MsgExecuteContract({
          sender: this.state.myAddress,
          contract: CONTRACT_ADDRESS,
          codeHash: CONTRACT_HASH,
          msg: { [functionName]: functionName === "Sqrt" ? firstOperand : [firstOperand, secondOperand] },
          sentFunds: [], // optional
        });

        console.log("created msg to broadcast");

        tx = await this.state.secretjs.tx.broadcast([calculationMessage], {
          gasLimit: 200000,
        });
        console.log("broadcasted tx");

        console.log(`the tx of the ${functionName} function is:`, tx);
      } catch (e) {
        console.log(`there was an error calling the ${functionName} method:`, e);
      }

      const txHash = tx.transactionHash;
      // Update state with the result.
      const res = `todo: decode tx ...${txHash.slice(txHash.length - 5)}`;
      console.log(res)
      this.setState({ result: res });
    }
    console.log(`returned ${functionName} function`);
    return result;
  };

  // can't use directly "this.getOperation" in the DOM, since then it will request the function every time
  // the state changes
  functions = {
    add: this.getOperation("add"),
    sub: this.getOperation("sub"),
    mul: this.getOperation("mul"),
    div: this.getOperation("div"),
    sqrt: this.getOperation("sqrt"),
  };

  getStateSetterForName = (stateVariableName) => {
    const result = async (event) => {
      this.setState({[stateVariableName]: event.target.value});
      console.log(`set ${stateVariableName} to ${event.target.value}`);
    }
    console.log(`returned setter for ${stateVariableName} state variable`);
    return result;
  };

  // Similarly, can't use directly "this.getStateSetterForName" in the DOM, for the same reason
  setters = {
    setter1: this.getStateSetterForName("firstOperand"),
    setter2: this.getStateSetterForName("secondOperand"),
  };

  render() {
    if (!this.state.secretjs) {
      return <div>Loading SecretJs, Keplr, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Secret Calculator</h1>
        <p>
          Welcome to Secret Calculator, where your calculations are stored on the blockchain but only you can see them!
        </p>
        <Input label="1" onchange={this.setters.setter1} value={this.state.firstOperand}/>
        <Input label="2" onchange={this.setters.setter2} value={this.state.secondOperand}/>
        <div className="flexbox-container">
          <MathButton label="+" onclick={this.functions.add}/>
          <MathButton label="–" onclick={this.functions.sub}/>
          <MathButton label="×" onclick={this.functions.mul}/>
          <MathButton label="÷" onclick={this.functions.div}/>
          <MathButton label="√(operand 1)" onclick={this.functions.sqrt}/>
        </div>
        <h2>
          result: {this.state.result}
        </h2>
        <History secretjs={this.state.secretjs} address={this.state.myAddress} result={this.state.result}/>
      </div>
    );
  }
}

export default App;