import { assert } from 'chai'

import {
  FRONTEND_REPO_NAME,
  CONTRACTS_REPO_NAME
} from '../../constants/repoNames'
import { getRepoNumber } from '../../helpers/tasks/getRepoNumber'
import { repoNameAndNumbers } from '../../constants/repoNameAndNumbers'

describe('getRepoNumber', function() {
  it('should properly return the repo number for the frontend repo', function() {
    const expected = repoNameAndNumbers[FRONTEND_REPO_NAME]
    const actual = getRepoNumber(FRONTEND_REPO_NAME)
    assert.equal(expected, actual, 'Frontend repo should be 0')
  })

  it('should properly return the repo number for the contracts repo', function() {
    const expected = repoNameAndNumbers[CONTRACTS_REPO_NAME]
    const actual = getRepoNumber(CONTRACTS_REPO_NAME)
    assert.equal(expected, actual, 'Contracts repo should be 1')
  })
})
