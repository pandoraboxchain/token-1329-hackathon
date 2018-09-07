'use strict';

require('@babel/register');
require('@babel/polyfill');

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
        }
    },
    mocha: {
        enableTimeouts: false
    }
};
