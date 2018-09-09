# Inalienable Reputation Token - [ERC1329](https://github.com/ethereum/EIPs/issues/1329) reference implementation (Draft)

## Abstract and motivation

Quote from EIP:

>Reputation belonging to an identity is frequently used in designing repeated economic games and protect them from malicious actors. The main property of such reputation should be inalienability. This ERC proposes the standard in creating inalienable reputation tokens.

[https://github.com/ethereum/EIPs/issues/1329](https://github.com/ethereum/EIPs/issues/1329)

## Main code

- [IReputation.sol](contracts/reputation/IReputation.sol) - Main intarface of Inalienable Reputation Token
- [Reputation.sol](contracts/reputation/Reputation.sol) - Reference implementation
- [ReputationIssuable.sol](contracts/reputation/ReputationIssuable.sol) - Extended reference implementation

## Tests

- [Reputation](test/reputation.js)
- [ReputationIssuable](test/reputation.issuable.js)

#### Coverage - [95%](coverage.md) 

## Testnet links

- [Reputation Issuable abi](./abi/ReputationIssuable.json)
- *Link to [Reputation Issuable contract](https://rinkeby.etherscan.io/address/0x75d2a768a00cf07abd2f0994e0318db9ed8dc48a)*
- Reputation contract owner private key (for experiments) `01599e03965ff7ed293252a471942a68e1ecfb74040f931e20d8984fe56fce1c`

## Instalation

### Requirements
- node.js v9 (up)
- npm

### Setup
```sh
npm i
```

### Testing
```sh
npm run test
```
Run tests with coverage:
```sh
npm run test:coverage
```
