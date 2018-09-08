pragma solidity ^0.4.24;

import "./IReputation.sol";


contract Reputation is IReputation {

    string public constant name = "ERC1329";
    string public constant symbol = "REP";
    uint256 public constant granularity = 1;

    mapping(address => uint256) internal _balances;
    mapping(address => address) internal _authorized_addresses;
    mapping(address => uint256) internal _authorized_duration;
    mapping(address => address) internal _owner_addresses;

    uint256 internal _totalSupply;
    uint256 internal _currentSupply;


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
    function name() public view {
        return name;
    }
    function symbol() public view {
        return symbol;
    }
    function granularity() public view {
        return granularity;
    }

    /// Reputation may be limited or unlimited by the supply. These functions
    /// provide information whether the supply is limited and, if not, the
    /// `totalLimit()` and `currentSupply()` will be returning the maximum amount
    /// of the tokens that can be produced and current token issuance
    function hasLimit() public view returns (bool) {
        return false;
    }
    function totalLimit() public view returns (uint256) {
        return 2**256 - 1; /// max value for uint256
    }
    function currentSupply() public view returns (uint256) {
        return 2**256 - 1; /// max value for uint256
    }
    function balanceOf(address owner) public view returns (uint256) {
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
        require(tx.origin == msg.sender);
        require(_authorized_addresses[tx.origin] != address(0));

        address auth = _authorized_addresses[tx.origin];

        uint256 old_duration = _authorized_duration[auth];
        if(old_duration<block.number){
            _authorized_duration[auth] = block.number + forDuration;
        } else {
            _authorized_duration[auth] = _authorized_duration[auth] + forDuration;
        }
    }
}
