const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
	
	const { exist, notExists, equals } = app.api.validation
	
	const encryptPassword = password => {
		const salt = bcrypt.genSaltSync(10)
		return bcrypt.hashSync(password, salt)
	}

    const save = async (req, res) => {
		
        const user = { ...req.body }

        if(req.params.id) user.id = req.params.id

        try{
			exist(user.name, 'Usuário não informado!')
			exist(user.email, 'E-mail não informado!')
			exist(user.password, 'Senha não informada!')
			exist(user.confirmPassword, 'Confirmação de senha não informada!')
			equals(user.password, user.confirmPassword, 'Senhas não conferem!')
			
			const userFromDB = await app.db('users').where({ email: user.email }).first()

			if(!user.id){
				notExists(userFromDB, 'Usuário já cadastrado!')
			}
        } catch(msg){
            return res.status(400).send(msg)
        }
		
		user.password = encryptPassword(user.password)
		delete user.confirmPassword
		
		if(user.id){
			app.db('users')
				.update(user)
				.where({ id: user.id })
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		} else {
			app.db('users')
				.insert(user)
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		}
		
    }
	
	const get = (req, res) => {
		app.db('users')
			.select('id', 'name', 'email')
			.then(users => res.json(users))
			.catch(err => res.status(500).send(err))
	}

    return { save, get }
}