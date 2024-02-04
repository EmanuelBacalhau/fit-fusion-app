import { Prisma } from '@prisma/client'

export interface ExercisesRepository {
  create(data: Prisma.ExerciseUncheckedCreateInput): Promise<void>
}
