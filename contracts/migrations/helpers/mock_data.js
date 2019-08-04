const web3Utils = require('web3-utils')

module.exports.tasksData = async function (accountZero, tasksInstance) {

  console.log(`Inserting mock data`)

  const tasksArtifacts = require('../build/contracts/Tasks.json')
  const contract = require('truffle-contract')
  let Tasks = contract(tasksArtifacts)

  const faker = require('faker')

  async function addTasks() {
    const tagsOptions = [
      'Contracts',
      'Contract Tests',
      'Contributors',
      'Copy Review',
      'DApp Proposal',
      'Decisions',
      'Design',
      'Design Review',
      'DID Token',
      'Education',
      'Frontend',
      'Frontend Tests',
      'Governance',
      'HAV Token',
      'HTML',
      'Idea',
      'Issue/Task Management',
      'New Parameter',
      'Planning',
      'React',
      'Security',
      'Semantic UI',
      'Solidity',
      'Tasks Contract'
    ]

    for (let i = 0; i < 30; i++) {

      try {
        console.log(`Inserting task mock: ${i}`)

        const taskID = web3Utils.randomHex(32).toString()

        const title = web3Utils.randomHex(32).toString()
        console.log(`title: ${title}`)

        const issueNUM = Math.floor(Math.random() * (500 - 1 + 1)) + 1

        const task = {
          _taskId: taskID,
          title: title,
          tags: 'Contracts:Frontend:Parameters',
          issueNum: issueNUM,
          repo: 'contracts'
        }

        // await tasksInstance.addTask(task)
        await tasksInstance.addTask(
          task._taskId,
          title, {
            from: accountZero
          })

        // const randomReward = Math.floor(Math.random() * (199 - 10 + 1)) + 1;
        // await tasksInstance.taskRewardVote(
        //   task._taskId,
        //   randomReward, {
        //     from: accountZero
        //   })

      } catch (error) {
        console.log(`error inserting mock data: ${error}`)
      }
    }
    return true
  }

  await addTasks()

  return true
}

module.exports.pullRequestsData = async function (accountZero, tasksInstance) {

  console.log(`Inserting mock data`)

  const pullRequestsArtifacts = require('../build/contracts/PullRequests.json')
  const contract = require('truffle-contract')
  let PullRequests = contract(pullRequestsArtifacts)

  const faker = require('faker')

  async function addPullRequests() {

    for (let i = 0; i < 30; i++) {

      try {
        console.log(`Inserting pullRequest: ${i}`)

        const taskID = web3Utils.randomHex(32).toString()
        console.log(`taskID: ${taskID}`)

        const title = faker.lorem.sentence()
        console.log(`title: ${title}`)

        const issueNUM = Math.floor(Math.random() * (500 - 1 + 1)) + 1
        console.log(`issueNUM: ${issueNUM}`)

        const task = {
          _taskId: taskID,
          title: title,
          tags: 'Contracts:Frontend:Parameters',
          issueNum: issueNUM,
          repo: 'contracts'
        }

        console.log(`account0 : ${accountZero}`)
        // await tasksInstance.addTask(task)
        await pullRequests.addTask(
          task._taskId,
          title,
          task.tags,
          issueNUM,
          task.repo, {
            from: accountZero
          })

      } catch (error) {
        console.log(`error inserting mock data: ${error}`)
      }
    }
    return true
  }

  await addTasks()

  return true
}

