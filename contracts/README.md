# Distense Smart Contracts

[![codecov](https://codecov.io/gh/Distense/distense-contracts/branch/master/graph/badge.svg)](https://codecov.io/gh/Distense/distense-contracts)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Build Status](https://travis-ci.org/Distense/distense-contracts.svg?branch=master)](https://travis-ci.org/Distense/distense-contracts)
![Distense logo](https://i.imgur.com/acI7y9U.png, 'Distense')

## Table of Contents

- [What is Distense?](#what-is-distense?)
- [Install](#install)
- [Usage](#usage)
- [Contract and Dapp Structure](#contract-and-dapp-structure)
- [Contribute](#contribute)
- [License](#license)

## What is Distense?

Distense is a decentralized code cooperative: a company without executives, offices, meetings and bosses.  Every contributor to Distense earns DID, an Ethereum token.  There's no ICO, but code contributors may invest small amounts, initially.  Hodlers of DID govern Distense on a one-vote-per-DID basis.

- Follow us on [Twitter](https://twitter.com/distenseorg)
- Star this repo
- If you want to contribute and are a frontend developer, see our [frontend repo](https://github.com/Distense/distense-ui)

## Install

- clone this repo
- [install npm](https://docs.npmjs.com/getting-started/installing-node) if necessary
- `npm i`

## Usage

- the primary way we interact with our smart contracts is by testing, so when developing we make changes to our contracts, test, then interact in the UI
- to test run `npm test` (if this fails make sure you don't have another testrpc shell running)


Once you get past the initial code->testing phase and want to view your changes in the UI

- Install `ganache`, an application that is a local Ethereum testnet: Download the appropriate version from here: https://github.com/trufflesuite/ganache/releases
- run ganache
- Then you need to compile and deploy your updated version of the contracts: `npm run migrateLocal`
- Once your contracts are migrated you can install and run the distense-ui client to interact with them:
    - `git clone https://github.com/Distense/distense-ui`
    - `cd distense-ui`
    - `npm install`
- What we normally do at this point is remove the npm published version of our contracts from the distense-ui node_modules: `rm -r node_modules/distense-contracts`.
- Then you can symlink _your_ version of our contracts into the proper location in the client:
    - `sudo ln ~/distense-contracts ~/distense-ui/node_modules`
- Then you can run the distense-ui with `npm run start`
- You can interact with your version of the contracts at this point and modify the distense-ui if you want


## Contract and Dapp Structure

The following is an overview of how Distense's smart contracts are structured.  


- There are four primary functions of the Distense workflow:
  1. [Proposing tasks](https://disten.se/tasks/add) with `addTask` (Tasks.sol)
  2. Voting on task rewards by clicking a single task [here](https://disten.se/tasks) to see) `taskRewardVote` (Tasks.sol)
  3. [Submitting](https://disten.se/pullrequests/add) pull requests (PullRequests.sol)
  4. Approving pull requests by clicking Approve [here](https://disten.se/pullrequests) (PullRequests.sol)
  
- Tasks.sol
  - The first two primary functions, `addTask` and `taskRewardVote` are found here.  
    - `taskRewardVote` is so long because we effectively house the modifiers in this function within it to minimize the size of the call stack which would exceed the limits if we didn't use require statements [here](https://github.com/Distense/distense-contracts/blob/91eb111a51fb0286d71c17961dffdf5e526abc8b/contracts/Tasks.sol#L97).
  - This contract queries Distense.sol like `distense.getParameterValueByTitle(distense.numDIDRequiredToTaskRewardVoteParameterTitle()));` quite a few times.
  - Tasks have three stages: `TENTATIVE`, `DETERMINED`, and `PAID`. Each task at the time of creation will be `TENTATIVE`. We default the reward to 100 initially, because we can't loop really in Solidity. Tasks become `DETERMINED` when enough holders of DID vote on the task reward. Tasks are `PAID` after a pullRequest is submitted and enough DID holders vote to approve them. 
- PullRequests.sol
  - The primary functions of submitting pull requests and approving are found in this contract with: `addPullRequest` and `approvePullRequest`
  - [DID are issued](https://github.com/Distense/distense-contracts/blob/91eb111a51fb0286d71c17961dffdf5e526abc8b/contracts/PullRequests.sol#L91) once a threshold has been reached in `approvePullRequest` -- in other words when enough DID holders have voted to approve a pull request. There are no votes against pull requests, at least not now
- Distense.sol
  - This contract is almost solely about Distense's governance parameters.  The original values are hardcoded in this file and the titles are also here.  When another contract checks the current value of a smart contract, it will query this smart contract.
  - This contract contains the DIDToken contract's address so it can query the percent of DID owned a voter has
- DIDToken.sol
  - This contract contains the important DID balances and functions that pertain to exchanging and investing ether for DID and vice versa.
  
 In both PullRequests.sol and Tasks.sol, we have lists of the tasks ids and pullRequest ids.  This is so we can loop through the mappings that hold them client-side. We get query in order of indexes the ids from the mappings.

## Contribute

- By contributing to this repo you will earn DID an Ethereum token that gives you governance and economic rights to Distense
    - See instructions on how to submit your work there

## License

All Rights Reserved © 2018 Distense
