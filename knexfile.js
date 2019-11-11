// Update with your config settings.
require('dotenv').config()

module.exports = {

    development: {
        client: 'pg',
        connection: {
            // host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        },

        pool: {
            min: 2,
            max: 10
        },
        
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        }
    },

    testing: {
        client: 'pg',
        connection: process.env.DB_URL,
        migrations: {
          directory: './migrations'  
        }
    },

    production: {
        client: 'pg',
        connection: {
            host: 'ec2-54-75-249-16.eu-west-1.compute.amazonaws.com',
            user: 'postgres',
            password: '123',
            database: 'postgres://yalbfainbznvmz:f74bba1252f3e5d7bfbead10cb57f294143e2538f600a764408086dc506e8e70@ec2-54-75-249-16.eu-west-1.compute.amazonaws.com:5432/dat6vkuviocndi'

        },

        pool: {
            min: 2,
            max: 10
        },
        
        migrations: {
            tableName: 'knex_migrations',
            directory: './migrations'
        }
    }

};
