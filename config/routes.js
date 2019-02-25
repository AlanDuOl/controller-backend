
module.exports = app => {
	app.post('/signup', app.api.user.save)
	app.get('/users', app.api.user.get)
}