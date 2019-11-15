const bodyParser = require('body-parser')
// const cors = require('cors')

// const origin = {
//     origin: 'https://controlle.herokuapp.com'
// }


module.exports = app => {
    app.use(bodyParser.json())
    // app.use(cors(origin))
    app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "https://controlle.herokuapp.com", /*"http://localhost:3000"*/); // update to match the domain you will make the request from
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  		next();
	})
}