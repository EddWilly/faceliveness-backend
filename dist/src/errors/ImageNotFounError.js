"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageNotFountError = void 0;
class ImageNotFountError extends Error {
    code = 404;
    type = 'IMAGE_NOT_FOUND_ERROR';
    message;
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ImageNotFountError = ImageNotFountError;
