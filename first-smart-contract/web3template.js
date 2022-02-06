const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');

const abi = [{"inputs":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Add","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Div","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Mul","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"int256","name":"x","type":"int256"},{"internalType":"int256","name":"y","type":"int256"}],"name":"Sub","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"pure","type":"function"}];
const contractAddress = "0xa6c84017a19C58027B910446f13F7770424d0EeD";

const deployedContract = new web3.eth.Contract(abi, contractAddress);
console.log("created contract");
console.log("contract has methods:", deployedContract.methods);

const main = async () => {
    try {
        console.log("calling method Add of the contract at address", contractAddress);
        console.log("Add", await deployedContract.methods.Add(12, -3).call());
        console.log("Sub", await deployedContract.methods.Sub(12, -3).call());
        console.log("Mul", await deployedContract.methods.Mul(12, -3).call());
        console.log("Div", await deployedContract.methods.Div(15, -3).call());
    } catch (e) {
        console.log("calling contact add method failed with:", e);
    }
}

main();
console.log("called main");

