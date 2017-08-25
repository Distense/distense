
export const reconstructTask = (taskValues) => {
  const task = {}
  task.createdBy = taskValues[0]
  task.title = taskValues[1]
  task.url = taskValues[2]
  task.tags = taskValues[3].split('|')
  task.ipfsHashID = taskValues[4]
  task.createdAt = taskValues[5].c[0]
  task.statusEnum = taskValues[6].c[0]
  task.status = task.statusEnum === 0 ?
    'proposal' : task.statusEnum === 1 ?
    'task' : 'contribution'
  return task
}
