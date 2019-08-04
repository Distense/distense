const web3 = require('web3')
const fetch = require('node-fetch')
const tagsOptions = require('./tags_options')
const _ = require('lodash')

module.exports = async function(tasks, accounts) {
  const repos = ['Distense/distense-ui/issues', 'Distense/contracts/issues']

  for (let repo of repos) {
    const url = 'https://api.github.com/repos/' + repo

    console.log(`Getting issues from: ${url}`)
    fetch(url, { body: 'u: JohnAllen' })
      .then(function(res) {
        return res.json()
      })
      .then(async function(issues) {
        for (let issue of issues) {
          if (issue.state !== 'open') return
          const title = issue.title
          const issueNum = issue.number
          const repoNum = repo.indexOf('distense-ui') > -1 ? 0 : 1 //0 for frontend, 1 for contracts repo
          const tagsString = repoNum === 0 ? 'site' : 'cts'
          const taskId = encodeTaskMetaDataToBytes32({
            title,
            issueNum,
            repoNum,
            tagsString
          })

          const added = await tasks.addTask(taskId, title, {
            from: accounts[0],
            gasPrice: 10000000000
          })
          if (added) console.log(`added github issue as task`)
        }
      })
      .catch(err => {
        console.log(`error: ${err}`)
      })
  }
}

const encodeTaskMetaDataToBytes32 = task => {
  //  js date int 1515200136407
  const dateString = new Date().getTime().toString()

  let tags = ''

  task.tagsString.split(':').forEach((tag, index) => {
    const tagObject = _.find(tagsOptions, function(tagOption) {
      return tagOption.value === tag
    })
    //  Use f to stay with the hex lex
    if (index > 0) tags += 'f' + tagObject.num
    else tags += tagObject.num
  })

  const encodedMetaData =
    dateString + 'a' + tags + 'b' + task.issueNum + 'c' + task.repoNum
  console.log(`encodedMetaData: ${encodedMetaData}`)

  return encodedMetaData
}

const taskIdHasBeenDecoded = taskId => {
  if (taskId.length > 32) return web3.toAscii(taskId).replace(/\0/g, '')
  return taskId
}

//  TODO import this from distense-ui to maintain consistency and use tested code instead
const decodeTaskBytes32ToMetaData = taskId => {
  //  example taskId: 1515514023593a1f4b21c0
  const decodedTaskId = taskIdHasBeenDecoded(taskId)
  const created = new Date(decodedTaskId.slice(0, 10) * 1000)

  const tags = []

  const tagsNums = decodedTaskId
    .slice(decodedTaskId.indexOf('a') + 1, decodedTaskId.indexOf('b'))
    .split('f')

  for (let tag of tagsNums) {
    const tagObject = _.find(tagsOptions, function(tagOption) {
      return tagOption.num.toString() === tag
    })
    tags.push(tagObject.text)
  }

  const repoIndex = decodedTaskId.indexOf('c')
  const issueNum = decodedTaskId.slice(
    decodedTaskId.indexOf('b') + 1,
    repoIndex
  )
  const repo =
    decodedTaskId.slice(repoIndex + 1) === '0' ? 'distense-ui' : 'contracts'

  return {
    created,
    tags,
    repo,
    issueNum
  }
}
