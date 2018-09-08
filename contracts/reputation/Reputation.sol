pragma solidity ^0.4.24;


import "./IReputation.sol";

contract Reputation is IReputation {

    string public constant name = "ERC1329";
    string public constant symbol = "REP";
    unit256 public constant granularity = 1;


    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------
    constructor() public {

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

    }

    /// Authorizes address to interact with the contract on behalf
    /// of the balance owner for a some duration (amount of blocks)
    function authAddress(address owner) public view returns (address) {

    }

}
