const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
	
	const { exists, notExists, equals } = app.api.validation
	
	const encryptPassword = password => {
		const salt = bcrypt.genSaltSync(10)
		return bcrypt.hashSync(password, salt)
	}

    const save = async (req, res) => {
		
        const user = { ...req.body }

        if(req.params.id) user.id = req.params.id

        try{
			exists(user.name, 'Usuário não informado!')
			exists(user.email, 'E-mail não informado!')
			exists(user.password, 'Senha não informada!')
			exists(user.confirmPassword, 'Confirmação de senha não informada!')
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
				.then(_ => res.status(201).send())
				.catch(err => res.status(500).send(err))
		}
		
    }
	
	const get = (req, res) => {
		app.db('users')
			.select('id', 'name', 'email')
			.then(users => res.json(users))
			.catch(err => res.status(500).send(err))
	}
	
	const getById = (req, res) => {
		app.db('users')
			.select('id', 'name', 'email')
			.where({ id: req.params.id }).first()
			.then(users => res.json(users))
			.catch(err => res.status(500).send(err))
	}
	
	const remove = async (req, res) => {
		const user = { ...req.body }
		if(req.params.id) user.id = req.params.id
		
		try {
			const deletedUser = await app.db('users')
				.delete()
				.where({ id: user.id })
				
			exists(deletedUser, "Usuário não existe!")
			res.status(204).send()
		} catch(msg) {
			res.status(400).send(msg)
		}
		
	}

    return { save, get, remove, getById }
}