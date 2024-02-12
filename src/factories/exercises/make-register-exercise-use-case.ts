import { RegisterExerciseUseCase } from '@src/use-cases/exercises/register-exercise-use-case'
import { PrismaExercisesRepository } from '@src/repositories/prisma/prisma-exercises-repository'
import { PrismaTypesExerciseRepository } from '@src/repositories/prisma/prisma-types-exercise-repository'

export function makeRegisterExerciseUseCase() {
  const exercisesRepository = new PrismaExercisesRepository()
  const typesExerciseRepository = new PrismaTypesExerciseRepository()
  const useCase = new RegisterExerciseUseCase(
    typesExerciseRepository,
    exercisesRepository,
  )

  return useCase
}
