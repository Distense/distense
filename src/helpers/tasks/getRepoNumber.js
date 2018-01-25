import {
  repoNameNumberMapping
} from '../../constants/repoNameNumberMapping'


export const getRepoNumber = repoName => {
  return repoNameNumberMapping[repoName]
}