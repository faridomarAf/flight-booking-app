
class AppError extends Error {
    constructor(message ,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.explanation = message;// whatever happen in the current call, it will be written inside explanation
        
        // Capture the stack trace, to trace where the error occured
        Error.captureStackTrace(this, this.constructor);
    }
};

module.exports = AppError