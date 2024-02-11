import { PrismaTypesExerciseRepository } from '@src/repositories/prisma/prisma-types-exercise-repository'
import { RegisterTypeExerciseUseCase } from '@src/use-cases/types-exercise/register-type-exercise-use-case'

export function makeRegisterTypeExerciseUseCase() {
  const typesExerciseRepository = new PrismaTypesExerciseRepository()
  const useCase = new RegisterTypeExerciseUseCase(typesExerciseRepository)

  return useCase
}
