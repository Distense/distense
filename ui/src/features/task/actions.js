import { receiveTasksInstance, requestTasksInstance } from '../tasks/actions'
import { setDefaultStatus, updateStatusMessage } from '../status/actions'
import { getGasPrice } from '../user/getGasPrice'
import { receiveUserNotAuthenticated } from '../user/actions'
import * as contracts from '../../contracts'

export const voteOnTaskReward = ({ taskId, reward }) => async (
  dispatch,
  getState
) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  dispatch(requestTasksInstance())
  const { taskRewardVote } = await contracts.Tasks // Get contract function from Tasks contract instance
  dispatch(receiveTasksInstance())

  updateStatusMessage('submitting task reward vote to blockchain')

  let receipt
  if (taskId && reward) {
    receipt = await taskRewardVote(taskId, reward, {
      from: coinbase,
      gasPrice: getGasPrice()
    })

    if (receipt) console.log(`got tx receipt`)
    if (receipt.tx) {
      console.log(`vote on task reward success`)
      updateStatusMessage('task reward vote confirmed')
    } else console.error(`vote on task reward failure`)
  }

  dispatch(setDefaultStatus())

  return receipt
}
