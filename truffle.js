'use strict';

require('@babel/register');
require('@babel/polyfill');

const PrivateKeyProvider = require('truffle-privatekey-provider');
const privateKey = require('./key').key;

module.exports = {
    networks: {
        ganache: {
            host: 'localhost',
            port: 8545,
            network_id: '*',
            gas: 0xfffffffffff
        },
        coverage: {
            host: 'localhost',
            port: 8555,
            network_id: '*',
            gas: 0xfffffffffff
        },
        rinkeby: {
            provider: _ => new PrivateKeyProvider(privateKey, `http://rinkeby.pandora.network`),
            port: 8545,
            network_id: '*'
        }
    },
    mocha: {
        enableTimeouts: false
    }
};
