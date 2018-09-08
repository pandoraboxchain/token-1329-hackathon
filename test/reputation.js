const Reputation = artifacts.require('Reputation');
const ReputationProxy = artifacts.require('ReputationProxy');

const assertRevert = require('./helpers/assertRevert')

contract('Reputation', accounts => {

    let reputation;
    let reputationProxy;
    let authAccount1 = accounts[0];
    let authAccount2 = accounts[1];
    let authAccount3 = accounts[2]
    let owner1 = accounts[3];
    let owner2 = accounts[4];

    before('setup', async () => {
        reputation = await Reputation.new();
        reputationProxy = await ReputationProxy.new();
    });

    it('#name should return name of token', async () => {

        const name = await reputation.name();
        assert.equal(name, 'ERC1329');
    });

    it('#symbol should return symbol of token', async () => {

        const symbol = await reputation.symbol();
        assert.equal(symbol, 'REP');
    });

    it('#granularity should return granularity of token', async () => {

        const granularity = await reputation.granularity();
        assert.equal(granularity, 1);
    });

    it('#hasLimit limit for unlimited flag', async () => {

        const hasLimit = await reputation.hasLimit();
        assert.equal(hasLimit, false);
    });

    it('#totalLimit total limit', async () => {

        const totalLimit = await reputation.totalLimit();
        assert.equal(totalLimit.toNumber(), Math.pow(2, 256)-1);
    });

    it('#currentSupply current supply', async () => {

        const currentSupply = await reputation.currentSupply();
        assert.equal(currentSupply.toNumber(), 0);
    });

    //---------------------------------------------------------
    // tests for balanceOf
    //---------------------------------------------------------
    it('#balanceOf balance of not existent owner', async () => {

        const currentBalance = await reputation.balanceOf(0x0);
        assert.equal(currentBalance.toNumber(), 0);
    });

    //---------------------------------------------------------
    // tests for grantAddressAuth
    //---------------------------------------------------------
    it('#grantAddressAuth should grant access to address', async () => {

        const result = await reputation.grantAddressAuth(authAccount1, 1000, {from: owner1});
        const authGranted = result.logs.filter(l => l.event === 'AuthGranted')[0];
        assert.equal(authGranted.args.owner, owner1);
        assert.equal(authGranted.args.auth, authAccount1);
        assert.equal(authGranted.args.duration.toNumber(), 1000);
    });

    it('#grantAddressAuth test fail on auth address 0x0', async () => {

        assertRevert(reputation.grantAddressAuth(0x0, 1000, {from: owner1}));

    });

    it('#grantAddressAuth test fail on double adding auth account', async () => {

        assertRevert(reputation.grantAddressAuth(authAccount1, 1000, {from: owner1}));

    });

    it('#grantAddressAuth add new auth account', async () => {

        const result = await reputation.grantAddressAuth(authAccount2, 2000, {from: owner1});
        const authGranted = result.logs.filter(l => l.event === 'AuthGranted')[0];
        assert.equal(authGranted.args.owner, owner1);
        assert.equal(authGranted.args.auth, authAccount2);
        assert.equal(authGranted.args.duration.toNumber(), 2000);

        const call_result = await reputation.authAddress(owner1)
        const currentAuthAddress = call_result[0]
        assert.equal(currentAuthAddress, authAccount2)
    });

    it('#grantAddressAuth should only be called by the origin owner', async () => {

        assertRevert(reputationProxy.testGrantAddressAuth(reputation.address, authAccount1, 1000, {from: owner1}));
    });

    //---------------------------------------------------------
    // tests for extendAuthDuration
    //---------------------------------------------------------
    it('#extendAuthDuration for authAccount1', async () => {

        const result = await reputation.extendAuthDuration(1000, {from: owner1});
        const authGranted = result.logs.filter(l => l.event === 'AuthGranted')[0];
        assert.equal(authGranted.args.owner, owner1);
        assert.equal(authGranted.args.auth, authAccount2);
        assert.equal(authGranted.args.duration.toNumber(), 1000);

    });


    //---------------------------------------------------------
    // tests for revokeAddressAuth
    //---------------------------------------------------------

});
