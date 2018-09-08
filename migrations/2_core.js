'use strict';

const ReputationIssuable = artifacts.require('ReputationIssuable');

module.exports = (deployer, network, accounts) => {
    
    return deployer.deploy(ReputationIssuable)
        .then(_ => ReputationIssuable.deployed())
        .catch(console.error);

};
