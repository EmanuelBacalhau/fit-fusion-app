import { Prisma } from '@prisma/client'

export interface HistoriesRepository {
  create(data: Prisma.HistoryUncheckedCreateInput): Promise<void>
}
