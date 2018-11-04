pragma solidity ^0.4.24;


import "./Reputation.sol";

contract ReputationProxy {

    function testGrantAddressAuth(address repAddr, address auth, uint duration) public returns (address) {
        Reputation rep = Reputation(repAddr);
        return rep.grantAddressAuth(auth, duration);
    }

    function testExtendAuthDuration(address repAddr, uint duration) public {
        Reputation rep = Reputation(repAddr);
        return rep.extendAuthDuration(duration);
    }

    function testRevokeAddressAuth(address repAddr) public {
        Reputation rep = Reputation(repAddr);
        return rep.revokeAddressAuth();
    }
}
