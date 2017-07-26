# Code Style

With many disparate contributors, it is important to establish and adhere to a single code style for consistency.

## Solidity

- Prepend `Log` to all solidity events to cleary denote that we are talking about an event and not a function
- All variables and functions must explicitly declare their visibility to both prevent from being hacked and to add relevant information to those reading the code.
- Using `ContractName.someFunction()` is strongly preferred over using the low-level `address.delegatecall()` due to the fact that the first approach will cause the calling function to throw an error instead of having the called function return false (see this [link](https://github.com/ConsenSys/smart-contract-best-practices#handle-errors-in-external-calls)) 

