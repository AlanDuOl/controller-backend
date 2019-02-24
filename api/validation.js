module.exports = app => {

    function exists(val, msg) {
        if(!val) throw msg
        if(Array.isArray(val) && val.length === 0) throw msg
        if(typeof val === 'string' && !val.trim()) throw msg
    }

    function notExists(val, msg) {
        try {
            exists(val, msg)
        } catch(msg) {
            return
        }
        throw msg
    }

    return { exists, notExists }
}