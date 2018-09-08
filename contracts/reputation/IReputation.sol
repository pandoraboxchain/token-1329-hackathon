pragma solidity ^0.4.24;


contract IReputation {
    /// ERC20-like properties providing general information 
    /// about token name and symbol
    function name() public view returns (string);
    function symbol() public view returns (string);

    /// ERC777-like granularity
    function granularity() public view returns (uint256);

    /// Reputation may be limited or unlimited by the supply. These functions
    /// provide information whether the supply is limited and, if not, the
    /// `totalLimit()` and `currentSupply()` will be returning the maximum amount
    /// of the tokens that can be produced and current token issuance
    function hasLimit() public view returns (bool);
    function totalLimit() public view returns (uint256);
    function currentSupply() public view returns (uint256);

    /// Function returns the balance of reputation tokens on an account
    function balanceOf(address owner) public view returns (uint256);
    
    /// Function returns the address that is authorised to sign transactions 
    /// to this contract that can affect amount of the reputation on the account
    function authAddress(address owner) public view returns (address auth, uint duration);
    
    /// Authorizes address to interact with the contract on behalf 
    /// of the balance owner for a some duration (amount of blocks)
    function grantAddressAuth(address auth, uint duration) public returns (address prevAddress);
    /// Extends authorized duration for the registered authorized address
    function extendAuthDuration(uint forDuration) public;
    /// Remokes authorisation right from the currently authorised address
    /// to interact with the contract on behalf of account owner
    function revokeAddressAuth() public;

    /// Produced when contract generates some about of reputation and assigns
    /// it to a certain account
    event Issued(address owner, uint amountProduced);
    /// Produced when contract burns some about of reputation on a certain account
    event Burned(address owner, uint amountBurned);

    /// Events for operations with authorised accounts
    event AuthGranted(address owner, address auth, uint duration);
    event AuthRevoked(address owner, address auth);
    event AuthExpired(address owner, address auth);
}
