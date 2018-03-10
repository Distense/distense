import { decodeTaskBytes32ToMetaData } from '../../tasks/operations/decodeTaskBytes32ToMetaData'

/**
 *
 * @param taskId
 * @returns {{repoName: string|string|string|*, tags}}
 */
export const getTaskDetailsForPullRequest = taskId => {
  const metadata = decodeTaskBytes32ToMetaData(taskId)

  return {
    repoName: metadata.repoName,
    tags: metadata.tags
  }
}
