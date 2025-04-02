class apiError extends Error {
    constructor(
        statusCode,
        message = 'Internal server error',
        errors = [],
        statck = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.statck = statck;
        this.data = null;
        this.message = message;
        this.success = false;

        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { apiError };