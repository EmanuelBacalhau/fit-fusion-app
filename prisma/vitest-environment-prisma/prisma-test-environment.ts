import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Environment } from 'vitest'
import { randomUUID } from 'crypto'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

export function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  const baseUrl = new URL(process.env.DATABASE_URL)

  baseUrl.searchParams.set('schema', schema)

  return baseUrl.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup() {
    const schema = randomUUID()

    process.env.DATABASE_URL = generateDatabaseUrl(schema)

    execSync('yarn prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
