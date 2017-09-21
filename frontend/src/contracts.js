import { selectContractInstance } from './web3'

import TasksArtifact from './contracts/Tasks.json'

export const Tasks = selectContractInstance(TasksArtifact)
