import { Prisma } from '@prisma/client'

interface HistoryResponse {
  id: string
  hour: string
  exercise: {
    name: string
    type: {
      name: string
    }
  }
}
export interface UserHistoryByUserIdResponse {
  title: string
  history: HistoryResponse[]
}

export interface HistoriesRepository {
  create(data: Prisma.HistoryUncheckedCreateInput): Promise<void>
  findManyByUserId(userId: string): Promise<UserHistoryByUserIdResponse[]>
}
