import React, { Component } from "react";
import BasicMathContract from "./contracts/BasicMath.json";
import getWeb3 from "./getWeb3";

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
  state = { firstOperand: 0, secondOperand: 0, result: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BasicMathContract.networks[networkId];
      console.log("the address of the deployed contract is:", deployedNetwork && deployedNetwork.address);
      const instance = new web3.eth.Contract(
        BasicMathContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  getOperation = (functionName) => {
    const result = async () => {
      const { contract, firstOperand, secondOperand } = this.state;
      console.log(`calling ${functionName} function with operands:`, firstOperand, secondOperand);

      let result;
      try {
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
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
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
          <MathButton label="Add" onclick={this.functions.Add}/>
          <MathButton label="Subtract" onclick={this.functions.Sub}/>
          <MathButton label="Multiply" onclick={this.functions.Mul}/>
          <MathButton label="Divide (rounded down)" onclick={this.functions.Div}/>
        </div>
        <h2>
          result: {this.state.result}
        </h2>
      </div>
    );
  }
}

export default App;