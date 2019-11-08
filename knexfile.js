// Update with your config settings.
const config = require('./.env')

module.exports = {

    client: 'pg',
    connection: {
      host: config.db.host,
      database: config.db.database,
      user:     config.db.user,
      password: config.db.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
