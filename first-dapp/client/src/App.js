import React, { Component } from "react";
import BasicMathContract from "./contracts/BasicMath.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // todo testing
      console.log("available accounts:", accounts);
      console.log("balance of 1st account:", accounts[0]);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BasicMathContract.networks[networkId];
      console.log("the address of the deployed contract is:", deployedNetwork && deployedNetwork.address);
      const instance = new web3.eth.Contract(
        BasicMathContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // console.log("the BasicMathContract like this:", BasicMathContract);
      // console.log("the instance of the contract looks like this:", instance);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { contract, accounts } = this.state;

    // Adds two numbers, to prove it worked
    // const response = await contract.methods.Add(10, 4).call();
    console.log("the methods of the contract are:", contract.methods);
    const response = await contract.methods.Add(10, 4).call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Basic maths contract</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will be
          the sum of 10 and 4
        </p>
        <div>The result value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
