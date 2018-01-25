import { assert } from 'chai'

import {
  decodeTaskBytes32ToMetaData
} from '../helpers/tasks/decodeTaskBytes32ToMetaData'
import { getRepoNumber } from '../helpers/tasks/getRepoNumber'
import { FRONTEND_REPO_NAME } from '../constants/repoNames'


describe('decodeTaskBytes32ToMetaData', function() {

  const taskIds = [
    '1516749224434a7b102c0',
    '1516749448964a7b95c0',
    '1516749704079a7b85c0'
  ]

  for (let taskId of taskIds) {
    it('should properly decode a EVM task bytes32 into task metadata', function (taskId) {

      console.log(`${taskId}`)
      const expected = {
        created: '1516749224434',
        tags: 'Frontend',
        repo: getRepoNumber(FRONTEND_REPO_NAME)
      }
      const actual = decodeTaskBytes32ToMetaData(taskId)
      assert.equal(expected, actual)
    })
  }
})
