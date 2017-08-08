const routes = module.exports = require('next-routes')()

routes
.add('index', '/')
.add('about')
.add('profile', '/profile/:address')