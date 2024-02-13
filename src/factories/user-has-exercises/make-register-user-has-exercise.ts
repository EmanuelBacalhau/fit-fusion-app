import { PrismaDaysRepository } from '@src/repositories/prisma/prisma-days-repository'
import { PrismaExercisesRepository } from '@src/repositories/prisma/prisma-exercises-repository'
import { PrismaUserHasExercisesRepository } from '@src/repositories/prisma/prisma-user-has-exercises-repository'
import { PrismaUsersRepository } from '@src/repositories/prisma/prisma-users-repository'
import { RegisterUserHasExerciseUseCase } from '@src/use-cases/user-has-exercises/register-user-has-exercise-use-case'

export function makeRegisterUserHasExerciseUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const exercisesRepository = new PrismaExercisesRepository()
  const daysRepository = new PrismaDaysRepository()
  const userHasExercisesRepository = new PrismaUserHasExercisesRepository()

  const useCase = new RegisterUserHasExerciseUseCase(
    usersRepository,
    exercisesRepository,
    daysRepository,
    userHasExercisesRepository,
  )

  return useCase
}
