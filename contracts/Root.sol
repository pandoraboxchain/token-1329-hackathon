pragma solidity ^0.4.24;


import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./lifecycle/OnlyOnce.sol";
import "./reputation/IReputation.sol";

/**
 * @title Pandora Smart Contract
 * @author "Kostiantyn Smyrnov" <kostysh@gmail.com>
 *
 * Root contract implementing the core functionality
 */

contract Root is Ownable, OnlyOnce {

    /*******************************************************************************************************************
     * ## Storage
     */

    /// ### Public variables

    string public constant version = "1.0.0";


    /*******************************************************************************************************************
     * ## Events
     */


    /*******************************************************************************************************************
     * ## Constructor 
     */

    /// ### Constructor
    constructor(
        //IReputation _reputation
    ) public 
    {}

    /*******************************************************************************************************************
     * ## Modifiers
     */


    /*******************************************************************************************************************
     * ## Functions
     */

    /// ### Public and external
}
