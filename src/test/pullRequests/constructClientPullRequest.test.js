import { assert } from 'chai'
import chai from 'chai'
import chaiJestDiff from 'chai-jest-diff'

chai.use(chaiJestDiff())

import { constructPullRequestFromContractDetails } from '../../helpers/pullRequests/constructPullRequestFromContractDetails.js'
import { FRONTEND_REPO_NAME } from '../../constants/repoNames'

describe('constructPullRequestFromContractDetails', function() {
  it('should properly construct client pullRequests', async function() {
    const prId = '12349871234'
    const contractTask = [
      '0x0de5be0e82493accb8e83d2af99e72458249bbf9', // createdBy
      '0x3135313637343932323434333461376231303263300000000000000000000000',
      4321,
      23
    ]

    const expected = {
      _id: prId,
      createdBy: contractTask[0],
      pctDIDApproved: 0.23,
      url: 'https://github.com/Distense/' + FRONTEND_REPO_NAME + '/pulls/4321',
      prNum: '4321'
    }

    const actual = constructPullRequestFromContractDetails(prId, contractTask)

    assert.deepEqual(actual, expected, 'fail fail fail')
  })
})
