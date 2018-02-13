import { assert } from 'chai'
import chai from 'chai'
import chaiJestDiff from 'chai-jest-diff'

chai.use(chaiJestDiff())

import { decodeTaskBytes32ToMetaData } from '../../../src/helpers/tasks/decodeTaskBytes32ToMetaData'
import { getRepoNameFromNumber } from '../../../src/helpers/tasks/getRepoNameFromNumber'

describe('decodeTaskBytes32ToMetaData', function() {
  it('should properly decode a EVM task bytes32 into task metadata', function() {
    const taskId = '1516749224434a7b102c0'
    const repo = getRepoNameFromNumber('0')
    const expected = {
      created: new Date(taskId.slice(0, 10) * 1000),
      tags: ['React'],
      repoName: getRepoNameFromNumber('0'),
      issueNum: '102'
    }
    const actual = decodeTaskBytes32ToMetaData(taskId)
    assert.deepEqual(expected, actual, `returned value doesn't match`)
  })

  it('should properly decode a EVM task bytes32 into task metadata', function() {
    const taskId = '1516749448964a8b95c0'
    const expected = {
      created: new Date(taskId.slice(0, 10) * 1000),
      tags: ['Security'],
      repoName: getRepoNameFromNumber('0'),
      issueNum: '95'
    }
    const actual = decodeTaskBytes32ToMetaData(taskId)
    assert.deepEqual(expected, actual)
  })

  it('should properly decode a EVM task bytes32 into task metadata', function() {
    const taskId = '1516749704079a7b85c1'
    const expected = {
      created: new Date(taskId.slice(0, 10) * 1000),
      tags: ['React'],
      repoName: getRepoNameFromNumber('1'),
      issueNum: '85'
    }
    const actual = decodeTaskBytes32ToMetaData(taskId)
    assert.deepEqual(expected, actual)
  })

  it('should properly decode a EVM task bytes32 into task metadata', function() {
    const taskId = '1516749704321a6b85c1'
    const expected = {
      created: new Date(taskId.slice(0, 10) * 1000),
      tags: ['Planning'],
      repoName: getRepoNameFromNumber('1'),
      issueNum: '85'
    }
    const actual = decodeTaskBytes32ToMetaData(taskId)
    assert.deepEqual(expected, actual)
  })
})
