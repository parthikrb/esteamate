import { CustomError } from "./custom-error";


export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super("Access denied");

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [{
            message: "Access denied"
        }]
    }
}