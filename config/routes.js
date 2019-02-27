
module.exports = app => {
	app.post('/signup', app.api.user.save)
	
	app.route('/users')
		.get(app.api.user.get)
		
	app.route('/users/:id')
		.get(app.api.user.getById)
		.delete(app.api.user.remove)
		
	app.route('/users/:userId/transactions/')
		.post(app.api.transactions.save)
		.get(app.api.transactions.get)
		
	app.route('/users/:userId/transactions/:id')
		.delete(app.api.transactions.remove)
}