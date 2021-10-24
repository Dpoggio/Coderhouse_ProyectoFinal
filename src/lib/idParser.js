const cfg = require('./constants.js')

/**** Helpers ****/
class IdNoNumerico extends Error {
    constructor() {
        super('id no numerico')
        this.name = this.constructor.name
        this.httpStatusCode = cfg.HTTP_BAD_REQUEST
        this.code = cfg.INVALID_ID_ERRCODE
        Error.captureStackTrace(this, this.constructor)
    }
}

function parseID(idString){
    if (isNaN(idString)) {
        throw new IdNoNumerico()
    }
    const id = parseInt(idString)
    return id
}

module.exports = { parseID }