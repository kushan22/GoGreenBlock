const ConvertLib = artifacts.require("ConvertLib");

const CarbonContract = artifacts.require("CarbonContract");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, CarbonContract);
  deployer.deploy(CarbonContract);
};
