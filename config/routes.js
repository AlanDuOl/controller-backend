
module.exports = app => {

	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "https://controlle.herokuapp.com/"); // update to match the domain you will make the request from
  		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  		next();
	})

	app.post('/signup', app.api.user.save)
	app.post('/signin', app.api.auth.signin)
	app.post('/validateToken', app.api.auth.validateToken)
	
	app.route('/users')
		.get(app.api.user.get)
		
	app.route('/users/:id')
		.get(app.api.user.getById)
		.delete(app.api.user.remove)
		
	app.route('/transactions')
		.post(app.api.transactions.save)

	app.route('/transactions/:id/:limit')
		.get(app.api.transactions.getLimit)

	app.route('/transactions/:id')
		.get(app.api.transactions.getById)
		.delete(app.api.transactions.remove)
		
}