const crypto = require('crypto')

exports.pullPromisedArray = promisedArray => {
  let i = 0

  return (abort, cb) => {
    if (abort) return

    promisedArray.then(vals => {
      if (!vals[i]) return cb(true)
      cb(null, vals[i++])
    }).catch(_ => cb(true))
  }
}

exports.gitObjectHash = ({ type, length, data }) => {
  const hasher = crypto.createHash('sha1')
  hasher.update(`${type} ${length}\0`)
  hasher.update(data)
  return hasher.digest('hex')
}