"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplicitNudityError = void 0;
class ExplicitNudityError extends Error {
    code = 400;
    message;
    constructor(message) {
        super();
        this.message = message;
    }
}
exports.ExplicitNudityError = ExplicitNudityError;
