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
            <input type="number" name="numform" onChange={this.props.onchange}/>
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
  // functions = {
  //   Add: this.getOperation("Add"),
  //   Sub: this.getOperation("Sub"),
  //   Mul: this.getOperation("Mul"),
  //   Div: this.getOperation("Div"),
  // };

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

      this.setState({ web3, accounts, contract: instance }, this.runExample);
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
      console.log("the result of the ${functionName} function is:", result);
      this.setState({ result });
    }
    console.log(`returned ${functionName} function`);
    return result;
  };

  getStateSetterForName = (stateVariableName) => {
    const result = async (event) => {
      this.setState({[stateVariableName]: event.target.value});
      console.log(`set for ${stateVariableName} to ${event.target.value}`);
    }
    console.log(`returned setter for ${stateVariableName} state variable`);
    return result;
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
        <Input label="operand1" onchange={this.getStateSetterForName("firstOperand")}/>
        <Input label="operand2" onchange={this.getStateSetterForName("secondOperand")}/>
        <div class="flexbox-container">
          <MathButton label="Add" onclick={this.getOperation("Add")}/>
          <MathButton label="Subtract" onclick={this.getOperation("Sub")}/>
          <MathButton label="Multiply" onclick={this.getOperation("Mul")}/>
          <MathButton label="Divide" onclick={this.getOperation("Div")}/>
        </div>
        <p>
          result: {this.state.result}
        </p>
      </div>
    );
  }
}

export default App;
