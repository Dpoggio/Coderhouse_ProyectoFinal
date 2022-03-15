
class BaseApi {

    static ErrorBaseNoEncontrado = Error
    static BaseDto = undefined
    static BaseDao = undefined

    static async get(id = null){
        if (id === null){
            return this.BaseDto.asDto(await this.BaseDao.getDao().getAll(id))
        } else {
            const element = await this.BaseDao.getDao().getById(id)
            if (element == null){
                throw new this.ErrorBaseNoEncontrado()
            }
            return this.BaseDto.asDto(element)
        }
    }

    static async save(element, id = null){
        element.timestamp = new Date()
        if (id === null){
            return this.BaseDto.asDto(await this.BaseDao.getDao().save(element))
        } else {
            const nuevoElement = await this.BaseDao.getDao().saveById(element, id)
            if (nuevoElement == null){
                throw new this.ErrorBaseNoEncontrado()
            }
            return this.BaseDto.asDto(nuevoElement)
        }
    }

    static async delete(id){
        const element = await this.BaseDao.getDao().deleteById(id)
        if (element == null) {
            throw new this.ErrorBaseNoEncontrado()
        }
    }
}

export default BaseApi;