import _ from 'lodash'
import { repoNameAndNumbers } from './repoNameAndNumbers'

export const getRepoNumber = repoName => {
  const repo = _.find(repoNameAndNumbers, o => {
    return o.name === repoName
  })
  return repo.number
}
