import { Prisma } from '@prisma/client'

export interface TypesExerciseRepository {
  create(data: Prisma.TypeExerciseCreateInput): Promise<void>
  findByName(name: string): Promise<boolean>
}
