// https://eth-goerli.g.alchemy.com/v2/p8cDegGrNYRuWlXQOCwAOj9g_mUBu7CT

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/p8cDegGrNYRuWlXQOCwAOj9g_mUBu7CT',
      accounts: ['bd0c1cc21d6c15c98f041673391e90eba44f958c1ddc917c451f7fcfd26d7610']
    }
  }
}