import { PrismaDaysRepository } from '@src/repositories/prisma/prisma-days-repository'
import { PrismaUserHasExercisesRepository } from '@src/repositories/prisma/prisma-user-has-exercises-repository'
import { PrismaUsersRepository } from '@src/repositories/prisma/prisma-users-repository'
import { FetchListOfUserHasExerciseByDayUseCase } from '@src/use-cases/user-has-exercises/fetch-list-of-user-has-exercise-by-day-use-case'

// terminar aqui
export function makeFetchListOfUserHasExerciseByDayUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const daysRepository = new PrismaDaysRepository()
  const userHasExercisesRepository = new PrismaUserHasExercisesRepository()

  const useCase = new FetchListOfUserHasExerciseByDayUseCase(
    usersRepository,
    daysRepository,
    userHasExercisesRepository,
  )

  return useCase
}
