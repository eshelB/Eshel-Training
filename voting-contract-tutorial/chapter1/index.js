const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

let account;
web3.eth.getAccounts().then((f) => {
    account = f[0];
})

abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

VotingContract = new web3.eth.Contract(abi);
VotingContract.options.address = "0x13c1b2bece900ae0905d93d3dd93aa2772f9e703";

candidates = {"Rama": "candidate-1", "Esh": "candidate-2", "jose": "candidate-3"}

function voteForCandidate(candidate) {
    const candidateName = $("#candidate").val();
    console.log(candidateName);

    VotingContract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName)).send({from: account}).then((f) => {
        let div_id = candidates[candidateName];
        VotingContract.methods.totalVotesFor(web3.utils.asciiToHex(candidateName)).call().then((f) => {
            $("#" + div_id).html(f);
        })
    })
}

$(document).ready(function() {
    candidateNames = Object.keys(candidates);

    for(var i=0; i<candidateNames.length; i++) {
        let name = candidateNames[i];

        VotingContract.methods.totalVotesFor(web3.utils.asciiToHex(name)).call().then((f) => {
            $("#" + candidates[name]).html(f);
        })
    }
});