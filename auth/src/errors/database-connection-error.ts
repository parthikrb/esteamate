import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 503;
    reason = 'Error connecting to database';

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{
            message: this.reason
        }];
    }
}