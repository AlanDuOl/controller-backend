// Update with your config settings.
const config = require('./.env')

module.exports = {

    client: 'postgresql',
    connection: {
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
