import _ from 'lodash'

import {
  repoNameAndNumbers
} from '../../constants/repoNameAndNumbers'


export const getRepoNameFromNumber = repoNumber => {
  const repo = _.find(repoNameAndNumbers, function (obj) {
    return obj.number === repoNumber
  })
  return repo.name
}