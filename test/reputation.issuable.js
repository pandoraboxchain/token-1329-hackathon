const ReputationIssuable = artifacts.require('ReputationIssuable');
const assertRevert = require('./helpers/assertRevert')

contract('ReputationIssuable', accounts => {
    let reputation;
    let reputationOwner = accounts[0];
    let authAccount1 = accounts[1];
    let authAccount2 = accounts[2];
    let authAccount3 = accounts[3];
    let authAccount4 = accounts[4];
    let owner1 = accounts[5];
    let owner2 = accounts[6];
    let owner3 = accounts[7];
    let owner4 = accounts[8];
    
    before('setup', async () => {
        reputation = await ReputationIssuable.new();
        await reputation.grantAddressAuth(authAccount1, 1000, {from: owner1});
        await reputation.grantAddressAuth(authAccount2, 1000, {from: owner2});
    });

    it('#issueByAuth should increment reputation', async () => {
        const balanceBefore = await reputation.balanceOf(owner1);
        const result = await reputation.issueByAuth(authAccount1, 100, {from: reputationOwner});
        const issued = result.logs.filter(l => l.event === 'Issued')[0];
        const balanceAfter = await reputation.balanceOf(owner1);
        const currentSupply = await reputation.currentSupply();
        assert.equal(balanceAfter-balanceBefore, 100);
        assert.equal(currentSupply, 100);
        assert.equal(issued.args.owner, owner1);
        assert.equal(issued.args.amountProduced, 100);
    });

    it('#issueByAuth should handle currentSupply for all owners', async () => {
        const result = await reputation.issueByAuth(authAccount2, 100, {from: reputationOwner});        
        const balance = await reputation.balanceOf(owner2);
        assert.equal(balance, 100);
        const currentSupply = await reputation.currentSupply();
        assert.equal(currentSupply, 200);
    });

    it('#issueByAuth negative by 0x0 address', async () => {
        assertRevert(reputation.issueByAuth(0x0, 100, {from: owner2}));
    });

    it('#burnedByAuth negative by 0x0 address', async () => {
        assertRevert(reputation.burnedByAuth(0x0, 100, {from: owner2}));
    });

    it('#burnedByAuth shoul decrement reputation', async () => {
        await reputation.grantAddressAuth(authAccount3, 1000, {from: owner3});
        await reputation.issueByAuth(authAccount3, 100, {from: reputationOwner});

        const currentSupplyBefore = await reputation.currentSupply();
        const balanceBefore = await reputation.balanceOf(owner3);
        const result = await reputation.burnedByAuth(authAccount3, 50, {from: reputationOwner});
        const burned = result.logs.filter(l => l.event === 'Burned')[0];
        const balanceAfter = await reputation.balanceOf(owner3);
        const currentSupplyAfter = await reputation.currentSupply();

        assert.equal(balanceAfter-balanceBefore, -50);
        assert.equal(currentSupplyAfter-currentSupplyBefore, -50);
        assert.equal(burned.args.owner, owner3);
        assert.equal(burned.args.amountBurned, 50);
    });

    it('#burnedByAuth shoul decrement reputation to 0', async () => {
        await reputation.grantAddressAuth(authAccount4, 1000, {from: owner4});
        await reputation.issueByAuth(authAccount4, 50, {from: reputationOwner});

        const currentSupplyBefore = await reputation.currentSupply();
        const balanceBefore = await reputation.balanceOf(owner4);
        const result = await reputation.burnedByAuth(authAccount4, 100, {from: reputationOwner});
        const burned = result.logs.filter(l => l.event === 'Burned')[0];
        const balanceAfter = await reputation.balanceOf(owner4);
        const currentSupplyAfter = await reputation.currentSupply();

        assert.equal(balanceAfter-balanceBefore, -50);
        assert.equal(currentSupplyAfter-currentSupplyBefore, -50);
        assert.equal(burned.args.owner, owner4);
        assert.equal(burned.args.amountBurned, 50);

    });


});
