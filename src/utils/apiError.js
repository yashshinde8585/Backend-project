class apiError extends Error {
    constructor(
        statusCode,
        message = 'Internal server error',
        errors = [],
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.data = null;
        this.message = message;
        this.success = false;

        if (!stack) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { apiError };
