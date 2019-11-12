const bodyParser = require('body-parser')
const cors = require('cors')

const origin = {
    origin: 'https://controlle.herokuapp.com'
}


module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors(origin))
}