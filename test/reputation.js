const Reputation = artifacts.require('Reputation');
const ReputationProxy = artifacts.require('ReputationProxy');

const assertRevert = require('./helpers/assertRevert')

contract('Reputation', accounts => {

    let reputation;
    let reputation1;
    let reputationProxy;
    let authAccount1 = accounts[0];
    let authAccount2 = accounts[1];
    let authAccount3 = accounts[2]
    let owner1 = accounts[3];
    let owner2 = accounts[4];
    let owner3 = accounts[5];
    let owner4 = accounts[6];

    before('setup', async () => {
        reputation = await Reputation.new();
        reputation1 = await Reputation.new();
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

    it('#grantAddressAuth grant from new owner', async () => {

        const result = await reputation.grantAddressAuth(authAccount1, 2000, {from: owner2});
        const authGranted = result.logs.filter(l => l.event === 'AuthGranted')[0];
        assert.equal(authGranted.args.owner, owner2);
        assert.equal(authGranted.args.auth, authAccount1);
        assert.equal(authGranted.args.duration.toNumber(), 2000);

        const call_result = await reputation.authAddress(owner2)
        const currentAuthAddress = call_result[0]
        assert.equal(currentAuthAddress, authAccount1)
    });

    it('#grantAddressAuth assert revert', async () => {

        assertRevert(reputation.grantAddressAuth(authAccount2, 2000, {from: owner1}));
    });

    it('#grantAddressAuth should only be called by the origin owner', async () => {

        assertRevert(reputationProxy.testGrantAddressAuth(reputation.address, authAccount1, 1000, {from: owner1}));
    });

    //---------------------------------------------------------
    // tests for extendAuthDuration
    //---------------------------------------------------------
    it('#extendAuthDuration should extend auth duration in case of blockNumber > prevoiusly granted duration', async () => {

        const result = await reputation.extendAuthDuration(1000, {from: owner1});
        const authGranted = result.logs.filter(l => l.event === 'AuthGranted')[0];
        assert.equal(authGranted.args.owner, owner1);
        assert.equal(authGranted.args.auth, authAccount2);
        assert.equal(authGranted.args.duration.toNumber(), 1000);
    });

    it('#extendAuthDuration should extend auth duration in case of blockNumber < prevoiusly granted duration', async () => {

        const result = await reputation1.grantAddressAuth(authAccount3, 0, {from: owner3});
        const authGranted = result.logs.filter(l => l.event === 'AuthGranted')[0];
        assert.equal(authGranted.args.duration.toNumber(), 0);

        const result1 = await reputation1.extendAuthDuration(1000, {from: owner3});
        const authGranted1 = result1.logs.filter(l => l.event === 'AuthGranted')[0];
        assert.equal(authGranted1.args.duration.toNumber(), 1000);
    });

    it('#extendAuthDuration should fail in case of wrong owner', async () => {

        assertRevert(reputation.extendAuthDuration(1000, {from: owner3}));
    });

    it('#extendAuthDuration should be called directly', async () => {

        assertRevert(reputationProxy.testExtendAuthDuration(reputation.address, 1000, {from: owner1}));
    });


    //---------------------------------------------------------
    // tests for revokeAddressAuth
    //---------------------------------------------------------
    it('#revokeAddressAuth should only be called by the origin owner', async () => {

        assertRevert(reputationProxy.testRevokeAddressAuth(reputation.address, {from: owner1}));
    });

    it('#revokeAddressAuth should fail in case of wrong owner', async () => {

        assertRevert(reputation.revokeAddressAuth({from: owner3}));
    });

    it('#revokeAddressAuth should revoke origin address', async () => {

        const result = await reputation.revokeAddressAuth({from: owner1});
        const authRevoked = result.logs.filter(l => l.event === 'AuthRevoked')[0];
        assert.equal(authRevoked.args.owner, owner1);
    });
    
});
