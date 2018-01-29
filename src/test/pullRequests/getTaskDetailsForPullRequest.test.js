import { assert } from 'chai'

import { TENTATIVE } from '../../constants/rewardStatuses'
import { getTaskDetailsForPullRequest } from '../../helpers/pullRequests/getTaskDetailsForPullRequest'

describe('getTaskDetailsForPullRequest', () => {
  it('should properly create task details for pull requests', () => {
    const taskId = '1516749224434a3b102c1'
    const expected = {
      created: '1516749224434',
      repoName: 'distense-contracts',
      tags: ['Education'],
      issueNum: '102'
    }
    const actual = getTaskDetailsForPullRequest(taskId)
    assert.equal(actual, expected, 'problem with getTaskDetailsForPullRequest')
  })
})
