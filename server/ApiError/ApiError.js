class ApiError extends Error{
    constructor(name,message) {
        super();
        this.name = name
        this.message = message
    }
    //неверный запрос
    static badRequest(message){
        return new ApiError(400,message)
    }
    //нет прав
    static Forbidden(message){
        return new ApiError(403,message)
    }
    //не найдено
    static NotFound(message){
        return new ApiError(404,message)
    }
    //ошибка сервера
    static InternalServer(message){
        return new ApiError(500,message)
    }
}
module.exports = ApiError