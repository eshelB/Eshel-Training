var BasicMath = artifacts.require("./BasicMath.sol");

module.exports = function(deployer) {
  deployer.deploy(BasicMath);
};
