import { selectContractInstance } from './web3'

import DidTokenArtifacts from './contracts/DIDToken.json'
import PullRequestsArtifacts from './contracts/PullRequests.json'
import TasksArtifacts from './contracts/Tasks.json'

export const DidToken = selectContractInstance(DidTokenArtifacts)
export const PullRequests = selectContractInstance(PullRequestsArtifacts)
export const Tasks = selectContractInstance(TasksArtifacts)
