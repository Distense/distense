import { assert } from 'chai'

import { decodeTaskBytes32ToMetaData } from '../../helpers/tasks/decodeTaskBytes32ToMetaData'
import { getRepoNameFromNumber } from '../../helpers/tasks/getRepoName'

describe('decodeTaskBytes32ToMetaData', function() {
  it('should properly decode a EVM task bytes32 into task metadata', function() {
    const taskId = '1516749224434a7b102c0'
    const repo = getRepoNameFromNumber('0')
    const expected = {
      created: new Date(taskId.slice(0, 10) * 1000),
      tags: ['Frontend'],
      repo: getRepoNameFromNumber('0'),
      issueNum: '102'
    }
    const actual = decodeTaskBytes32ToMetaData(taskId)
    assert.deepEqual(expected, actual, `returned value doesn't match`)
  })

  it('should properly decode a EVM task bytes32 into task metadata', function() {
    const taskId = '1516749448964a7b95c0'
    const expected = {
      created: new Date(taskId.slice(0, 10) * 1000),
      tags: ['Frontend'],
      repo: getRepoNameFromNumber('0'),
      issueNum: '95'
    }
    const actual = decodeTaskBytes32ToMetaData(taskId)
    assert.deepEqual(expected, actual)
  })

  it('should properly decode a EVM task bytes32 into task metadata', function() {
    const taskId = '1516749704079a7b85c1'
    const expected = {
      created: new Date(taskId.slice(0, 10) * 1000),
      tags: ['Frontend'],
      repo: getRepoNameFromNumber('1'),
      issueNum: '85'
    }
    const actual = decodeTaskBytes32ToMetaData(taskId)
    assert.deepEqual(expected, actual)
  })

  it('should properly decode a EVM task bytes32 into task metadata', function() {
    const taskId = '1516749704321a7b85c1'
    const expected = {
      created: new Date(taskId.slice(0, 10) * 1000),
      tags: ['Frontend'],
      repo: getRepoNameFromNumber('1'),
      issueNum: '85'
    }
    const actual = decodeTaskBytes32ToMetaData(taskId)
    assert.deepEqual(expected, actual)
  })
})
