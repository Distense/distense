import _ from 'lodash'

import { tagsOptions } from './tagsOptions'
import { getRepoNumber } from './getRepoNumber'

/**
 * Encode metadata about a task into less than 32 bytes
 * Includes a date, tags, repoNumber,
 * everything about a task except the id itself (because we create that here)
 * and the title
 * @param task  object
 * @returns {string} encoded bytes32 for Solidity that looks like 1516749224434a7b102c0
 */
export const encodeTaskMetaDataToBytes32 = task => {
  //  js date int 1515200136407
  const dateString = new Date().getTime().toString()

  let tags = ''

  task.tagsString.split(':').forEach((tag, index) => {
    const tagObject = _.find(tagsOptions, function(tagOption) {
      return tagOption.value === tag
    })
    //  Use f to stay with the hex lex
    if (index > 0) tags += 'f' + tagObject.num
    else tags += tagObject.num
  })

  const repoNum = getRepoNumber(task.repoString)

  return dateString + 'a' + tags + 'b' + task.issueNum + 'c' + repoNum
}
