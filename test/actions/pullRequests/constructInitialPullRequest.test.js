import { assert } from 'chai'
import chai from 'chai'
import chaiJestDiff from 'chai-jest-diff'

chai.use(chaiJestDiff())

import web3Utils from 'web3-utils'

import { constructInitialPullRequest } from '../../../src/helpers/pullRequests/constructInitialPullRequest'

describe('constructInitialPullRequest', function() {
  it('should properly construct initial pullRequests', async function() {
    const taskId = '1515514023593a1f4b21c0'
    const prNum = '321'
    const _id = web3Utils.randomHex(10) + '-' + prNum
    const coinbase = web3Utils.randomHex(20)
    const createdAt = new Date()

    const task = {
      rewardStatus: 'DETERMINED',
      title: undefined,
      tags: ['Frontend', 'React'],
      taskReward: '123'
    }
    const expected = {
      _id,
      taskId,
      prNum,
      createdAt,
      createdBy: coinbase,
      pctDIDApproved: '0',
      rewardStatus: task.rewardStatus,
      taskTitle: 'unavailable',
      tags: task && task.tags ? task.tags : [],
      taskReward: task && task.reward
    }

    const actual = constructInitialPullRequest(
      _id,
      coinbase,
      createdAt,
      taskId,
      task,
      prNum
    )

    assert.deepEqual(actual, expected, 'fail fail fail')
  })

  it('should properly construct initial pullRequests', async function() {
    const taskId = '2115514023593a1f4b21c0'
    const prNum = '1'
    const _id = web3Utils.randomHex(10) + '-' + prNum
    const coinbase = web3Utils.randomHex(20)
    const createdAt = new Date()

    const task = {
      rewardStatus: 'TENTATIVE',
      title: 'An amazing task',
      tags: ['Contracts'],
      reward: '4999'
    }
    const expected = {
      _id,
      taskId,
      prNum,
      createdAt,
      createdBy: coinbase,
      pctDIDApproved: '0',
      rewardStatus: task.rewardStatus,
      taskTitle: 'An amazing task',
      tags: task.tags,
      taskReward: '4999'
    }

    const actual = constructInitialPullRequest(
      _id,
      coinbase,
      createdAt,
      taskId,
      task,
      prNum
    )

    assert.deepEqual(actual, expected, 'fail fail fail')
  })
})
