import { ErrorIdNoNumerico } from './errors.js'



function parseID(idString){
    if (isNaN(idString)) {
        throw new ErrorIdNoNumerico()
    }
    const id = parseInt(idString)
    return id
}

export default { parseID }