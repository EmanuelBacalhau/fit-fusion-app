import { Prisma } from '@prisma/client'

export interface UserHasExercisesRepository {
  create(data: Prisma.UserExerciseUncheckedCreateInput): Promise<void>
}
