import React, { Component } from "react";
import {SecretNetworkClient, MsgExecuteContract} from "secretjs";

import "./App.css";
import {getHistory} from "./getHistory";

const CONTRACT_ADDRESS = "secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg";
const CONTRACT_HASH = "1a573176d7eab70777a86241c5ac29aa5093d2536a74a41723ed918167f46281";
const CHAIN_ID = "secretdev-1";
// const CHAIN_ID = "pulsar-2";

const arithmeticSigns = {
  Add: "+",
  Sub: "–",
  Mul: "×",
  Div: "÷"
};

class Input extends Component {
  render() {
    return (
      <div className="Input">
        <form>
          <label>
            operand {this.props.label}: &emsp;
            <input type="number" min="0" name="numform" onChange={this.props.onchange} value={this.props.value}/>
          </label>
        </form>
      </div>
    );
  }
}

class History extends Component {
  render() {
    if (this.props.history_loading) {
      return <div>Loading History...</div>;
    }

    if (this.props.history_error) {
      return <div>Error Getting History</div>;
    }

    let listItems = []

    if (this.props.total <= 0) {
      listItems = [<div key="nocalc"> No Past Calculations </div>];
    } else {
      listItems = this.props.calcs.map((calculation, index) => {
        if (calculation.operation === "Sqrt") {
          return <div key={index}>
            √( { calculation.left_operand } ) = { calculation.result }
          </div>
        }

        return <div key={index}>
            { calculation.left_operand } &nbsp;
            { arithmeticSigns[calculation.operation] } &nbsp;
            { calculation.right_operand } = { calculation.result }
          </div>
      });
    }

    const lowerIndex = Math.min(this.props.total, this.props.page * this.props.page_size + 1);
    const upperIndex = Math.min(this.props.total, (this.props.page + 1) * this.props.page_size);

    return (
      <div className="History">
        <p>
          History of calculations (Showing {lowerIndex}-{upperIndex} out of {this.props.total}):
        </p>
        <div className="b">
          {listItems}
        </div>
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
  state = {
    firstOperand: 0,
    secondOperand: 0,
    status: "",
    calcs: [],
    total: 0,
    secretjs: null,
    myAddress: null,
    pageSize: 10,
    page: 0,
    historyLoading: true,
    permit: null,
    signature: null,
    historyError: false,
  };

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
      const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
      console.log("my address is:", myAddress);

      // const wallet = new Wallet(
      //   "grant rice replace explain federal release fix clever romance raise often wild taxi quarter soccer fiber love must tape steak together observe swap guitar",
      // );
      // const myAddress = wallet.address;

      const secretjs = await SecretNetworkClient.create({
        grpcWebUrl: process.env.REACT_APP_GRPC_WEB_URL,
        chainId: CHAIN_ID,
        // wallet,
        wallet: keplrOfflineSigner,
        walletAddress: myAddress,
        encryptionUtils: window.getEnigmaUtils(CHAIN_ID),
      });
      console.log("created secret client");

      document.title = "Secret Calculator";

      this.setState({ status: "No transactions pending", secretjs, myAddress });
    } catch (error) {
      alert(`Failed to connect to secret network. Check console for details.`);
      console.error(error);
    }

    this.reloadHistory();
    console.log("state:", this.state);
  };

  reloadHistory = async (additionalStateUpdates) => {
    const state = {historyLoading: true, ...additionalStateUpdates};
    console.log("setting state before reloading history: ", JSON.stringify(state, null, 2))
    await this.setState({
      historyLoading: true,
      historyError: false,
      ...additionalStateUpdates,
    });
    try {
      const [history, signature] = await getHistory({
        secretjs: this.state.secretjs,
        page: this.state.page,
        pageSize: this.state.pageSize,
        signerAddress: this.state.myAddress,
        cachedSignature: this.state.signature,
        chainId: CHAIN_ID,
        contractAddress: CONTRACT_ADDRESS,
        contractHash: CONTRACT_HASH,
      });

      console.log("calculation history received:", history, "sig:", signature);
      this.setState({
        calcs: history.calculation_history.calcs,
        total: parseInt(history.calculation_history.total),
        historyLoading: false,
        signature,
      })
    } catch (e) {
      console.error("error when while updating history:", e);
      this.setState({
        historyLoading: false,
        historyError: true,
      });
    }
  }

  getOperation = (functionName) => {
    const result = async () => {

      console.log("state:", this.state);

      let { firstOperand, secondOperand } = this.state;
      [ firstOperand, secondOperand ] = [ firstOperand.toString(), secondOperand.toString() ];
      console.log(`calling ${functionName} function with operands:`, firstOperand, secondOperand);

      let tx;
      let status;
      try {
        console.log(`sending ${functionName} tx from`, this.state.myAddress);
        this.setState({status: "Sending transaction..."});

        const msg = { [functionName]: functionName === "sqrt" ? firstOperand : [firstOperand, secondOperand] };

        const calculationMessage = new MsgExecuteContract({
          sender: this.state.myAddress,
          contract: CONTRACT_ADDRESS,
          codeHash: CONTRACT_HASH,
          msg,
        });

        console.log(`broadcasting tx with msg: ${JSON.stringify(msg, null, 2)}`);
        tx = await this.state.secretjs.tx.broadcast([calculationMessage], {
          gasLimit: 200000,
        });

        const txHashEnd = tx.transactionHash.slice(tx.transactionHash.length - 5);
        console.log("tx successfully included in block");
        console.log(`the tx of the ${functionName} function is:`, tx);

        if (tx.jsonLog?.generic_err || tx.jsonLog?.parse_err) {
          status = `Transaction ${txHashEnd} errored`;
          this.setState({status});
          alert(`Transaction ${txHashEnd} failed: ${tx.jsonLog.generic_err?.msg || tx.jsonLog.parse_err?.msg}`);
          return;
        } else {
          // Ideally we would display the result of the calculation and not the status of the transaction.
          // Unfortunately, getting the result of a tx is not supported by secretJS right now.
          // The result can still be seen in the History section
          status = `Transaction ${txHashEnd} was included in block`;
          console.log(status);
        }
      } catch (e) {
        alert(`there was an error calling the ${functionName} method:`, e);
      }

      this.reloadHistory({status});
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
          {this.state.status}
        </h2>
        <History
          secretjs={this.state.secretjs}
          calcs={this.state.calcs}
          total={this.state.total}
          page_size={this.state.pageSize}
          page={this.state.page}
          history_loading={this.state.historyLoading}
          history_error={this.state.historyError}
        />
        <label>
          <div className="flexbox-container">
            <button className="Pagination"
                    onClick={() => this.reloadHistory({page: 0})}
                    disabled={this.state.page === 0 || this.state.historyLoading}
            >
              Page 0
            </button>
            <button className="Pagination"
                    onClick={() => this.reloadHistory({page: this.state.page + 1})}
                    disabled={this.state.historyLoading || ((this.state.page + 1) * this.state.pageSize) >= this.state.total}
            >
              Next page >
            </button>
          </div>
        </label>
      </div>
    );
  }
}

export default App;