
const knexfile = require('../knexfile.js')
const knex = require('knex')

const env = process.env.NODE_ENV || 'production'

const configOptions = knexfile[env]

module.exports = knex(configOptions)