import { Exercise, Prisma } from '@prisma/client'

export interface ExercisesRepository {
  create(data: Prisma.ExerciseUncheckedCreateInput): Promise<void>
  findById(id: string): Promise<Exercise | null>
}
