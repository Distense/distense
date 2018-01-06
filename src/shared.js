
export const votingIntervalParameter = {
  title: 'votingInterval'
}

export const proposalPctDIDApprovalParameter = {
  title: 'proposalPctDIDRequired'
}

export const pullRequestPctDIDParameter = {
  title: 'pullRequestPctDIDRequired'
}

export const tagsOptions = [
  { text: 'Contracts', value: 'cts', key: 'cts', num: 0 },
  { text: 'Contract Tests', value: 'cts-test', key: 'cts-test', num: 1 },
  { text: 'Contributors', value: 'contribs', key: 'contribs', num: 2 },
  { text: 'Copy Review', value: 'copy', key: 'copy', num: 3 },
  { text: 'DApp Proposal', value: 'dapp', key: 'dapp', num: 4 },
  { text: 'Design', value: 'des', key: 'des', num: 5 },
  { text: 'Education', value: 'edu', key: 'edu', num: 6 },
  { text: 'Frontend', value: 'site', key: 'site', num: 7 },
  { text: 'Frontend Tests', value: 'site-tests', key: 'site-tests', num: 8 },
  { text: 'Governance', value: 'gov', key: 'gov', num: 9 },
  { text: 'HAV Token', value: 'hav', key: 'hav', num: 10 },
  { text: 'Issue/Task Management', value: 'admin', key: 'admin', num: 11 },
  { text: 'New Parameter', value: 'param', key: 'param', num: 12 },
  { text: 'Planning', value: 'plan', key: 'plan', num: 13 },
  { text: 'React', value: 'react', key: 'react', num: 14 },
  { text: 'Security', value: 'sec', key: 'sec', num: 15 },
  { text: 'Solidity', value: 'sol', key: 'sol', num: 16 }
]

export const specPlaceholder = `
  ## Task Title 
  - Make lists of pithy facts and instructions
  - **Bold** stuff
  - *Italicize* text
  - ### Headers
  - ------------------
  ## Add code examples
  \`\`\`js
  const React = require('react')
  const Markdown = require('react-markdown')
  React.render(
    <Markdown source='# Your markdown here' />,
    document.getElementById('content')
  )
\`\`\``