import { Prisma, TypeExercise } from '@prisma/client'

export interface TypesExerciseRepository {
  create(data: Prisma.TypeExerciseCreateInput): Promise<void>
  findByName(name: string): Promise<boolean>
  findById(id: string): Promise<TypeExercise | null>
}
