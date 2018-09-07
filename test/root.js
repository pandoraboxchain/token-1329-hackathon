const Root = artifacts.require('Root');

contract('Root', accounts => {

    let root;

    before('setup', async () => {
        root = await Root.new();
    });

    it('#version should return contract version', async () => {

        const version = await root.version();
        assert.equal(version, '1.0.0');
    });
});
