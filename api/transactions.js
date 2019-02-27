module.exports = app => {
	
	const { exists } = app.api.validation
	
	const save = (req, res) => {
		const transaction = { ...req.body }
		if(req.params.id) transaction.id = req.params.id
		
		try {
			exists(transaction.type, 'Informe a natureza da operação!')
			exists(transaction.transaction, 'Informe o tipo de operação!')
			exists(transaction.description, 'Informe a descrição da operação!')
			exists(transaction.amount, 'Informe o valor da operação!')
			exists(transaction.transactionDate, 'Informe a data efetiva da operação!')
		} catch(msg) {
			res.status(400).send(msg)
		}
		
		if(transaction.id){
			transaction.updatedAt = new Date()
			app.db('transactions')
				.update(transaction)
				.where({ id: transaction.id })
				.then(_ => res.status(204).send())
				.catch(err => res.status(500).send(err))
		} else {
			transaction.createdAt = new Date()
			app.db('transactions')
				.insert(transaction)
				.then(_ => res.status(201).send())
				.catch(err => res.status(500).send(err))
		}
	}
	
	const remove = async (req, res) => {		
		try {
            const rowsDeleted = await app.db('transactions')
                .where({ id: req.params.id }).del()

            try {
                exists(rowsDeleted, 'Artigo não encontrado.')
            } catch(err){
                return res.status(400).send(msg)    
            }
            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }
	
	const get = (req, res) => {
		
	}
	
	return { save, remove, get }
}