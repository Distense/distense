// import Random from 'meteor-random'

export const constructInitialPullRequest = (
  _id,
  coinbase,
  createdAt,
  taskId,
  task,
  prNum
) => {
  return Object.assign(
    {},
    {
      _id,
      taskId, // id of task one is submitting pull request for
      prNum, // url pointing to Github pr of completed work
      createdAt,
      createdBy: coinbase,
      pctDIDApproved: '0',
      rewardStatus: task.rewardStatus,
      taskTitle: task && task.title ? task.title : 'unavailable',
      tags: task && task.tags ? task.tags : [],
      taskReward: task && task.reward
    }
  )
}
