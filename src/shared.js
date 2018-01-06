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
  { text: 'Contracts', value: 'cts', key: 'cts' },
  { text: 'Contract Tests', value: 'cts-test', key: 'cts-test' },
  { text: 'Contributors', value: 'contribs', key: 'contribs' },
  { text: 'Copy Review', value: 'copy', key: 'copy' },
  { text: 'DApp Proposal', value: 'dapp', key: 'dapp'},
  { text: 'Design', value: 'des', key: 'des' },
  { text: 'Education', value: 'edu', key: 'edu' },
  { text: 'Frontend', value: 'site', key: 'site' },
  { text: 'Frontend Tests', value: 'site-tests' , key: 'site-tests'},
  { text: 'Governance', value: 'gov', key: 'gov' },
  { text: 'HAV Token', value: 'hav', key: 'hav' },
  { text: 'Issue/Task Management', value: 'admin', key: 'admin' },
  { text: 'New Parameter', value: 'param', key: 'param' },
  { text: 'Planning', value: 'plan', key: 'plan'  },
  { text: 'React', value: 'react', key: 'react'  },
  { text: 'Security', value: 'sec', key: 'sec' },
  { text: 'Solidity', value: 'sol', key: 'sol' }
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

// const getTagsMappingValue = tags => {
//   let encodedBlockchainTagString = ''
//   tags.forEach((tag) => {
//
//   })
// }
//
// export const encodeTaskDataIntoBytes32 = task => {
//
//   //  js date int 1515200136407
//   const tagsString = getTagsMappingValue(task.tags)
//
//   return contentHash
// }
