pragma solidity ^0.4.24;


import "./Reputation.sol";

contract ReputationProxy {

    function testGrantAddressAuth(address repAddr, address auth, uint duration) public returns (address) {
        Reputation rep = Reputation(repAddr);
        return rep.grantAddressAuth(auth, duration);
    }
}
