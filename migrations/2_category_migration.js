const Category = artifacts.require("Category");

module.exports = function(deployer) {
  deployer.deploy(Category);
};
