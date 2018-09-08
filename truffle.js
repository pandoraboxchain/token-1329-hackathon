'use strict';

require('@babel/register');
require('@babel/polyfill');

const PrivateKeyProvider = require('truffle-privatekey-provider');
let privateKey = '';
let infuraKey = '';

try {
    privateKey = require('./key').key;
    infuraKey = require('./key').infkey;
} catch(err) {}

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
            provider: _ => new PrivateKeyProvider(privateKey, `https://rinkeby.infura.io/${infuraKey}`),
            network_id: '*',
            gas: 6700000
        }
    },
    mocha: {
        enableTimeouts: false
    }
};
