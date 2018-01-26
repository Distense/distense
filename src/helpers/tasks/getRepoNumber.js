import {
  repoNameAndNumbers
} from '../../constants/repoNameAndNumbers'


export const getRepoNumber = repoName => {
  return repoNameAndNumbers[repoName]
}