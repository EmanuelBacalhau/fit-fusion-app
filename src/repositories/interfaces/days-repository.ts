import { Prisma } from '@prisma/client'

export interface DaysRepository {
  create(data: Prisma.DayCreateInput): Promise<void>
  findByName(name: string): Promise<boolean>
}
