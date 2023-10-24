import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient()

async function init() {
  await prismaClient.$connect()
}

init()

export { prismaClient }
