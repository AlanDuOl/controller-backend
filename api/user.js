module.exports = app => {

    const save = async (req, res) => {
        const user = { ...req.body }

        const { exist, notExists } = app.api.validation

        if(req.params.id) user.id = req.params.id

        try {

        } catch(msg) {
            return res.status(400).send(msg)
        }
    }

    return { save }
}