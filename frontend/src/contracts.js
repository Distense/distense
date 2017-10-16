import { selectContractInstance } from './web3'

import DidTokenArtifacts from './contracts/DIDToken.json'
import DistenseArtifacts from './contracts/Distense.json'
import PullRequestsArtifacts from './contracts/PullRequests.json'
import TasksArtifacts from './contracts/Tasks.json'

export const DidToken = selectContractInstance(DidTokenArtifacts)
export const Distense = selectContractInstance(DistenseArtifacts)
export const PullRequests = selectContractInstance(PullRequestsArtifacts)
export const Tasks = selectContractInstance(TasksArtifacts)