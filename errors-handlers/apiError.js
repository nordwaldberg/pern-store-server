class ApiError extends Error {
    constructor(statusCode, message) {
        super();
        this.status = statusCode;
        this.message = message;
    }

    static handleBadRequestError(message) {
        return new ApiError(404, message);
    }

    static handleInternalError(message) {
        return new ApiError(500, message);
    }

    static handleForbiddenError(message) {
        return new ApiError(403, message);
    }
}

module.exports = ApiError;