"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
exports.prismaClient = prismaClient;
async function init() {
    await prismaClient.$connect();
}
init();
