# Code Style

With many disparate contributors, it is important to establish and adhere to a single code style for consistency.

## Solidity

- Prepend `Log` to all solidity events to cleary denote that we are talking about an event and not a function
- All variables and functions must explicitly declare their visibility to both prevent from being hacked and to add relevant information to those reading the code.
