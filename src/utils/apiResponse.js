class apiResponse {
    constructor(statusCode, message, data = "Success") {
        this.statusCode = statusCode < 400;
        this.message = message;
        this.data = data;
    }
}

export { apiResponse };