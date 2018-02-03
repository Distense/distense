import _ from 'lodash'

import { tagsOptions } from '../../tagsOptions'
import { taskIdDecoded } from './taskIdDecoded'
import { getRepoNameFromNumber } from './getRepoNameFromNumber'

export const decodeTaskBytes32ToMetaData = taskId => {
  //  example taskId: 1515514023593a1f4b21c0
  const decodedTaskId = taskIdDecoded(taskId)
  const created = new Date(decodedTaskId.slice(0, 10) * 1000)

  const tags = []

  const tagsNums = decodedTaskId
    .slice(decodedTaskId.indexOf('a') + 1, decodedTaskId.indexOf('b'))
    .split('f')

  for (let tag of tagsNums) {
    const tagObject = _.find(tagsOptions, function(tagOption) {
      return tagOption.num.toString() === tag
    })
    tags.push(tagObject.text)
  }

  const repoIndex = decodedTaskId.indexOf('c')
  const issueNum = decodedTaskId.slice(
    decodedTaskId.indexOf('b') + 1,
    repoIndex
  )
  const repoName = getRepoNameFromNumber(decodedTaskId.slice(repoIndex + 1))

  return {
    created,
    tags,
    repoName,
    issueNum
  }
}
