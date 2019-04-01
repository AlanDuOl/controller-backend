
module.exports = app => {
	app.post('/signup', app.api.user.save)
	app.post('/signin', app.api.auth.signin)
	app.post('/validateToken', app.api.auth.validateToken)
	
	app.route('/users')
		.get(app.api.user.get)
		
	app.route('/users/:id')
		.get(app.api.user.getById)
		.delete(app.api.user.remove)
		
	app.route('/transactions/insert')
		.post(app.api.transactions.save)

	app.route('/transactions')
		.get(app.api.transactions.get)
		
	app.route('/users/:userId/transactions/:id')
		.put(app.api.transactions.save)
		.get(app.api.transactions.getById)
		.delete(app.api.transactions.remove)
}