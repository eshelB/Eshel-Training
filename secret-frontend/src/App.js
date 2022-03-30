import React, { Component } from "react";
import { SecretNetworkClient } from "secretjs";

import "./App.css";

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
  state = { firstOperand: 0, secondOperand: 0, result: 0, web3: null, accounts: null, contract: null, secretjs: null };

  componentDidMount = async () => {
    try {
      console.log("attempting to connect to scrt-network via ", process.env.REACT_APP_GRPC_WEB_URL);
      const secretjs = await SecretNetworkClient.create({
        grpcWebUrl: process.env.REACT_APP_GRPC_WEB_URL,
      });
      console.log("created secret client");

      //todo playing around, remove later:
      console.log("querying node for balance");
      const {
        balance: { amount },
      } = await secretjs.query.bank.balance({
        address: "secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03",
        denom: "uscrt",
      });
      console.log("m8a450s03's balance is", amount, "uscrt");
      const contractAddress = "secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg";

      // Get codeHash using `secretcli q compute contract-hash secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg`
      const contractHash =
        "1a573176d7eab70777a86241c5ac29aa5093d2536a74a41723ed918167f46281";

      console.log("querying contract");
      const result = await secretjs.query.compute.queryContract({
        address: contractAddress,
        codeHash: contractHash, // optional but way faster
        query: {
          "with_permit": {
            "query": { "calculation_history": { "page_size": "3" }},
            "permit": {
              "params": {
                "permit_name": "test",
                "allowed_tokens": ["secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg"],
                "chain_id": "secret-4",
                "permissions": ["calculation_history"]
              },
              "signature": {
                "pub_key": {"type": "tendermint/PubKeySecp256k1", "value": "A31nYb+/VgwXsjhgmdkRotRexaDmgblDlhQja/rtEKwW"},
                "signature": "redacted"
              }
            }
          }
        },
      });

      console.log(result);

      document.title = "Secret Calculator"

      // todo set correct state
      this.setState({ web3: undefined, accounts: undefined, contract: undefined, result: amount, secretjs });
    } catch (error) {
      alert(`Failed to connect to secret network. Check console for details.`);
      console.error(error);
    }
  };

  getOperation = (functionName) => {
    const result = async () => {
      const { contract, firstOperand, secondOperand } = this.state;
      console.log(`calling ${functionName} function with operands:`, firstOperand, secondOperand);

      let result;
      try {
        //todo interact with secretJS and not with web3
        result = await contract.methods[functionName](firstOperand, secondOperand).call();
      } catch (e) {
        console.log(`there was an error calling the ${functionName} method:`, e);
      }

      // Update state with the result.
      console.log(`the result of the ${functionName} function is:`, result);
      this.setState({ result });
    }
    console.log(`returned ${functionName} function`);
    return result;
  };

  // can't use directly "this.getOperation" in the DOM, since then it will request the function every time
  // the state changes
  functions = {
    Add: this.getOperation("Add"),
    Sub: this.getOperation("Sub"),
    Mul: this.getOperation("Mul"),
    Div: this.getOperation("Div"),
    Sqrt: this.getOperation("Sqrt"),
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
      return <div>Loading SecretJs, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Basic Calculator</h1>
        <p>Implemented with the basicMathsContract</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below calculator will behave correctly
        </p>
        <Input label="1" onchange={this.setters.setter1} value={this.state.firstOperand}/>
        <Input label="2" onchange={this.setters.setter2} value={this.state.secondOperand}/>
        <div className="flexbox-container">
          <MathButton label="+" onclick={this.functions.Add}/>
          <MathButton label="–" onclick={this.functions.Sub}/>
          <MathButton label="×" onclick={this.functions.Mul}/>
          <MathButton label="÷" onclick={this.functions.Div}/>
          <MathButton label="√(operand 1)" onclick={this.functions.Sqrt}/>
        </div>
        <h2>
          result: {this.state.result}
        </h2>
      </div>
    );
  }
}

export default App;