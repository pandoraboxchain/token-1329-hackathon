'use strict';

const Migrations = artifacts.require('Migrations');

module.exports = (deployer, network, accounts) => {

    return deployer.deploy(Migrations)
        .catch(err => {
            throw err;
        });
};
