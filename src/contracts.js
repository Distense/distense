import { selectContractInstance } from './web3'

import DidTokenArtifacts from 'distense-contracts/build/contracts/DIDToken.json'
import DistenseArtifacts from 'distense-contracts/build/contracts/Distense.json'
import PullRequestsArtifacts from 'distense-contracts/build/contracts/PullRequests.json'
import TasksArtifacts from 'distense-contracts/build/contracts/Tasks.json'

export const DidToken = selectContractInstance(DidTokenArtifacts)
export const Distense = selectContractInstance(DistenseArtifacts)
export const PullRequests = selectContractInstance(PullRequestsArtifacts)
export const Tasks = selectContractInstance(TasksArtifacts)
