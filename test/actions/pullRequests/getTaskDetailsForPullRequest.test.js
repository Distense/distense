import chai from 'chai'
import { assert } from 'chai'
import chaiJestDiff from 'chai-jest-diff'

chai.use(chaiJestDiff())

import { getTaskDetailsForPullRequest } from '../../../src/pullRequests/getTaskDetailsForPullRequest'

describe('getTaskDetailsForPullRequest', () => {
  it('should properly create task details for pull requests', () => {
    const taskId = '1516749224434a3b102c1'
    const expected = {
      repoName: 'distense-contracts',
      tags: ['Frontend']
    }
    const actual = getTaskDetailsForPullRequest(taskId)
    assert.deepEqual(
      actual,
      expected,
      'problem with getTaskDetailsForPullRequest: 1516749224434a3b102c1'
    )
  })

  it('should properly create task details for pull requests', () => {
    const taskId = '1516749224434a2b102c0'
    const expected = {
      repoName: 'distense-ui',
      tags: ['Design']
    }
    const actual = getTaskDetailsForPullRequest(taskId)
    assert.deepEqual(
      actual,
      expected,
      'problem with getTaskDetailsForPullRequest: 1516749224434a3b102c1'
    )
  })
})
