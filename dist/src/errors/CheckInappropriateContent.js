"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInappropriateContent = void 0;
class CheckInappropriateContent extends Error {
    statusCode;
    message;
    constructor(statusCode, message) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.CheckInappropriateContent = CheckInappropriateContent;
