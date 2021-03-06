pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./Reputation.sol";


contract ReputationIssuable is Reputation, Ownable {

    function issueByAuth(address auth, uint256 value) public onlyOwner() {
        require(_owner_addresses[auth] != address(0));

        address owner = _owner_addresses[auth];

        require(!_banneds[owner]);

        uint256 duration = _authorized_duration[auth];
        if (duration >= block.number) {
            _balances[owner] = _balances[owner].add(value);
            _currentSupply = _currentSupply.add(value);
            emit Issued(owner, value);
        } else {
            emit AuthExpired(owner, auth);
        }
    }

    function  burnedByAuth(address auth, uint256 value) public onlyOwner() {
        require(_owner_addresses[auth] != address(0));

        address owner = _owner_addresses[auth];
        uint256 duration = _authorized_duration[auth];
        
        if (duration >= block.number) {
            uint256 balance = _balances[owner];
            
            if (value < balance) {
                _balances[owner] = _balances[owner].sub(value);
                _currentSupply = _currentSupply.sub(value);
                emit Burned(owner, value);
            } else {
                uint256 burned = _balances[owner];
                delete _balances[owner];
                _currentSupply = _currentSupply.sub(burned);
                delete _authorized_addresses[owner];
                delete _authorized_duration[auth];
                delete _owner_addresses[auth];
                _banneds[owner] = true;
                emit Burned(owner, burned);
            }
        } else {
            emit AuthExpired(owner, auth);
        }
    }

}