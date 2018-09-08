const ReputationIssuable = artifacts.require('ReputationIssuable');
const assertRevert = require('./helpers/assertRevert')

contract('ReputationIssuable', accounts => {
    let reputation;
    let authAccount1 = accounts[0];
    let authAccount2 = accounts[1];
    let authAccount3 = accounts[2]
    let owner1 = accounts[3];
    let owner2 = accounts[4];

    before('setup', async () => {
        reputation = await ReputationIssuable.new();
        await reputation.grantAddressAuth(authAccount1, 1000, {from: owner1});
        await reputation.grantAddressAuth(authAccount2, 1000, {from: owner2});
    });

    it('#issueByAuth negative by 0x0 address', async () => {
        assertRevert(reputation.issueByAuth(0x0, 100, {from: owner2}));
    });

    it('#issueByAuth should increment reputation', async () => {
        const balanceBefore = await reputation.balanceOf(owner1);
        const result = await reputation.issueByAuth(authAccount1, 100, {from: owner1});
        const issued = result.logs.filter(l => l.event === 'Issued')[0];
        const balanceAfter = await reputation.balanceOf(owner1);
        const currentSupply = await reputation.currentSupply();
        assert.equal(balanceAfter-balanceBefore, 100);
        assert.equal(currentSupply, 100);
        assert.equal(issued.args.owner, owner1);
        assert.equal(issued.args.amountProduced, 100);
    });

    it('#issueByAuth should handle currentSupply for all owners', async () => {
        const result = await reputation.issueByAuth(authAccount2, 100, {from: owner2});        
        const balance = await reputation.balanceOf(owner2);
        assert.equal(balance, 100);
        const currentSupply = await reputation.currentSupply();
        assert.equal(currentSupply, 200);
    });

    // it('#', async () => {
        
    // });

});
