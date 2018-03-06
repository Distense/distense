import { assert } from 'chai'

import { FRONTEND_REPO_NAME, CONTRACTS_REPO_NAME } from '../../../src/repoNames'
import { getRepoNumber } from '../../../src/tasks/getRepoNumber'

describe('getRepoNumber', function() {
  it('should properly return the repo number for the frontend repo', function() {
    const expected = '0'
    const actual = getRepoNumber(FRONTEND_REPO_NAME)
    assert.equal(expected, actual, `Frontend repo should be ${expected}`)
  })

  it('should properly return the repo number for the contracts repo', function() {
    const expected = '1'
    const actual = getRepoNumber(CONTRACTS_REPO_NAME)
    assert.equal(expected, actual, 'Contracts repo should be 1')
  })
})
