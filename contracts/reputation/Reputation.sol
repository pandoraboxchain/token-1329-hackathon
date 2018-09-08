pragma solidity ^0.4.24;


import "./IReputation.sol";

contract Reputation is IReputation {

    string public constant name = "ERC1329";
    string public constant symbol = "REP";
    unit256 public constant granularity = 1;

    mapping(address => unit256) internal _balances;
    mapping(address => address) internal _authorized_addresses;
    mapping(address => unit256) internal _authorized_duration;
    mapping(address => address) internal _owner_addresses;

    unit256 internal _totalSupply;
    unit256 internal _currentSupply;


    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------
    constructor() public {
        // no tokens minted on deploy
        _currentSupply = 0;
    }


    // ------------------------------------------------------------------------
    // Functions
    // ------------------------------------------------------------------------
    function name() public {
        return name;
    }
    function symbol() public {
        return symbol;
    }
    function granularity() public {
        return granularity;
    }

    /// Reputation may be limited or unlimited by the supply. These functions
    /// provide information whether the supply is limited and, if not, the
    /// `totalLimit()` and `currentSupply()` will be returning the maximum amount
    /// of the tokens that can be produced and current token issuance
    function hasLimit() public view returns (bool) {
        return false;
    }
    function totalLimit() public view returns (unit256) {
        return 2**256 - 1; /// max value for unit256
    }
    function currentSupply() public view returns (unit256) {
        return 2**256 - 1; /// max value for unit256
    }
    function balanceOf(address owner) public view returns (unit256) {
        return _balances[owner]; /// return requested owner balance
    }

    /// Authorizes address to interact with the contract on behalf
    /// of the balance owner for a some duration (amount of blocks)
    function authAddress(address owner) public view returns (address) {
        return _authorized_addresses[owner];
    }

    /// Authorizes address to interact with the contract on behalf
    /// of the balance owner for a some duration (amount of blocks)
    function grantAddressAuth(address auth, uint duration) public returns (address prevAddress){
        require(tx.origin == msg.sender);
        require(auth != address(0));
        require(_owner_addresses[auth] == address(0));

        address prev = _authorized_addresses[tx.origin];

        _authorized_addresses[tx.origin] = auth;
        _authorized_duration[auth] = duration + block.number;
        _owner_addresses[auth] = tx.origin;

        return prev;
    }

    /// Extends authorized duration for the registered authorized address
    function extendAuthDuration(uint forDuration) public {
        
    }
}
