'use strict';

const ReputationIssuable = artifacts.require('ReputationIssuable');

module.exports = (deployer, network, accounts) => {

    // console.log('Deploying of ReputationIssuable');
    
    return deployer.deploy(ReputationIssuable)
        .then(_ => ReputationIssuable.deployed())
        // .then(rep => console.log('Deployed:', rep))
        .catch(console.error);

};
