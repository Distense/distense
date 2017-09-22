import { selectContractInstance } from './web3'

import TasksArtifact from './contracts/Tasks.json'
import PullRequestsArtifacts from './contracts/PullRequests.json'

export const Tasks = selectContractInstance(TasksArtifact)
export const PullRequests = selectContractInstance(PullRequestsArtifacts)
