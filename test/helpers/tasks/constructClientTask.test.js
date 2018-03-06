import { assert } from 'chai'
import chai from 'chai'
import chaiJestDiff from 'chai-jest-diff'
import { BigNumber } from 'bignumber.js'
chai.use(chaiJestDiff())

import { constructClientTask } from '../../../src/helpers/tasks/constructClientTask'
import {
  CONTRACTS_REPO_NAME,
  FRONTEND_REPO_NAME
} from '../../../src/constants/repoNames'
import {
  DETERMINED,
  PAID,
  TENTATIVE
} from '../../../src/constants/rewardStatuses'
import { taskIdDecoded } from '../../../src/helpers/tasks/taskIdDecoded'

describe('constructClientTask', function() {
  it('should properly construct client tasks', async function() {
    //  1516749224434a7b102c0
    const taskId =
      '0x3135313637343932323434333461376231303263300000000000000000000000'
    const contractTask = [
      'some amazing title', //  title
      '0x0de5be0e82493accb8e83d2af99e72458249bbf9', // createdBy
      new BigNumber(32000), //  didReward Solidity int
      new BigNumber(1), // rewardStatusInteger; 1 is DETERMINED
      2500, // pctDIDVoted Solidity int (multiplied by 100)
      2 //  numVotes
    ]

    const expected = {
      _id: taskIdDecoded(taskId),
      createdBy: '0x0de5be0e82493accb8e83d2af99e72458249bbf9',
      createdAt: new Date('1516749224434'.slice(0, 10) * 1000),
      rewardString: '\xa00.32 ETH || 320 DID',
      rewardStatus: DETERMINED,
      votingStatus: '25.00% voted\xa02 votes',
      pctDIDVoted: '25.00',
      numVotes: 2,
      title: 'some amazing title',
      issueURL:
        'https://github.com/Distense/' + FRONTEND_REPO_NAME + '/issues/102',
      repoName: FRONTEND_REPO_NAME,
      tags: ['React']
    }

    const actual = constructClientTask(taskId, contractTask, 1000)

    assert.deepEqual(actual, expected, 'fail')
  })

  it('should properly construct client tasks', async function() {
    //  1516749221234a5b333c1
    const taskId =
      '0x31353136373439323231323334613562333333633100000000000000000000000'
    const contractTask = [
      'another amazing title', //  title
      '0x0de5be0e82493accb8e83d2af99e72458249bbf9', // createdBy
      new BigNumber(121321), //  didReward Solidity int
      new BigNumber(2), // rewardStatusInteger; 2 is PAID
      5000, // pctDIDVoted Solidity int (multiplied by 100)
      3 //  numVotes
    ]

    const expected = {
      _id: taskIdDecoded(taskId),
      createdBy: '0x0de5be0e82493accb8e83d2af99e72458249bbf9',
      createdAt: new Date('1516749221234'.slice(0, 10) * 1000),
      rewardString: '\xa01.213 ETH || 1213.21 DID',
      rewardStatus: PAID,
      votingStatus: '50.00% voted\xa03 votes',
      pctDIDVoted: '50.00',
      numVotes: 3,
      title: 'another amazing title',
      issueURL:
        'https://github.com/Distense/' + CONTRACTS_REPO_NAME + '/issues/333',
      repoName: CONTRACTS_REPO_NAME,
      tags: ['Parameters']
    }

    const actual = constructClientTask(taskId, contractTask, 1000)

    assert.deepEqual(actual, expected, 'fail')
  })

  it('should properly construct client tasks', async function() {
    //  1516749221234a5f6f7b333c0
    const taskId =
      '0x31353136373439323231323334613566366637623333336330000000000000000000000000'
    const contractTask = [
      'another amazing title', //  title
      '0x0de5be0e82493accb8e83d2af99e72458249bbf9', // createdBy
      new BigNumber(1200), //  didReward Solidity int
      new BigNumber(0), // rewardStatusInteger; 2 is PAID
      2000, // pctDIDVoted Solidity int (multiplied by 100)
      1 //  numVotes
    ]

    const expected = {
      _id: taskIdDecoded(taskId),
      createdBy: '0x0de5be0e82493accb8e83d2af99e72458249bbf9',
      createdAt: new Date('1516749221234'.slice(0, 10) * 1000),
      rewardString: 'n/a',
      rewardStatus: TENTATIVE,
      votingStatus: '20.00% voted\xa01 votes',
      pctDIDVoted: '20.00',
      numVotes: 1,
      title: 'another amazing title',
      issueURL:
        'https://github.com/Distense/' + FRONTEND_REPO_NAME + '/issues/333',
      repoName: FRONTEND_REPO_NAME,
      tags: ['Parameters', 'Planning', 'React']
    }

    const actual = constructClientTask(taskId, contractTask, 1000)

    assert.deepEqual(actual, expected, 'fail')
  })
})
