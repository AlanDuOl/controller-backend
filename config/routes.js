
module.exports = app => {
	app.post('/signup', app.api.user.save)
	
	app.route('/users')
		.get(app.api.user.get)
		
	app.route('/users/:id')
		.get(app.api.user.getById)
		.delete(app.api.user.remove)
		
	// app.route('/transactions')
}