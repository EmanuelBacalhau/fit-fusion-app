import { PrismaExercisesRepository } from '@src/repositories/prisma/prisma-exercises-repository'
import { PrismaHistoriesRepository } from '@src/repositories/prisma/prisma-histories-repository'
import { PrismaUsersRepository } from '@src/repositories/prisma/prisma-users-repository'
import { RegisterHistoryUseCase } from '@src/use-cases/histories/register-history-use-case'

export function makeRegisterHistoryUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const exercisesRepository = new PrismaExercisesRepository()
  const historiesRepository = new PrismaHistoriesRepository()

  const useCase = new RegisterHistoryUseCase(
    exercisesRepository,
    usersRepository,
    historiesRepository,
  )

  return useCase
}
