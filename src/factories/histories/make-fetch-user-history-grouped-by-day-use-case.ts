import { PrismaHistoriesRepository } from '@src/repositories/prisma/prisma-histories-repository'
import { PrismaUsersRepository } from '@src/repositories/prisma/prisma-users-repository'
import { FetchUserHistoryGroupedByDayUseUseCase } from '@src/use-cases/histories/fetch-user-history-grouped-by-day-use-case'

export function makeFetchUserHistoryGroupedByDayUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const historiesRepository = new PrismaHistoriesRepository()

  const useCase = new FetchUserHistoryGroupedByDayUseUseCase(
    usersRepository,
    historiesRepository,
  )

  return useCase
}
