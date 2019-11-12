const app = require('express')()
const consign = require('consign')
const db = require('./config/db.js')

app.db = db

consign()
    .include('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(process.env.NODE_ENV === 'production' ? process.env.DB_PRD_PORT : process.env.DB_DEV_PORT, () => {
    console.log('Server running...')
})