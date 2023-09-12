const Blog = require('./blog')
const User = require('./user')
const List = require('./list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: List, as: 'readings' })
Blog.belongsToMany(User, { through: List, as: 'readinglists' })

module.exports = { Blog, User, List }