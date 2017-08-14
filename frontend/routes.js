const routes = module.exports = require('next-routes')()

routes
.add('index', '/')
.add('about')
.add('test')
.add('profile', '/profile/:address')
.add('stats')
.add('tasks/create', 'tasks/create')
.add('tasks-all', 'tasks/all')
