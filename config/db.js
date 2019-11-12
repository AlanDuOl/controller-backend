
const knexfile = require('../knexfile.js')
const knex = require('knex')

const env = process.env.NODE_ENV

const configOptions = knexfile[env]

module.exports = knex(configOptions)