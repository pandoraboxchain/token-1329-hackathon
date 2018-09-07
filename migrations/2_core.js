'use strict';

const Root = artifacts.require('Root');
const Reputation = artifacts.require('Reputation');

module.exports = (deployer, network, accounts) => {
    let reputation, rootContract;

    // return deployer.deploy(Reputation)
    //     .then(_ => Reputation.deployed())
    //     .then(instance => {
    //         reputation = instance
    //         return deployer.deploy(Root, reputation.address)
    //     })
    //     .then(_ => Root.deployed())
    //     .then(instance => {
    //         rootContract = instance;
    //         return Promise.resolve();
    //     })
    //     .catch(console.error);

    return deployer.deploy(Root)
        .then(_ => Root.deployed())
        .then(instance => {
            rootContract = instance;
            return Promise.resolve();
        })
        .catch(console.error);
};
