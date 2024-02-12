import { Prisma } from '@prisma/client'
import { ExercisesRepository } from '../interfaces/exercises-repository'
import { prisma } from '@src/libs/prisma'

export class PrismaExercisesRepository implements ExercisesRepository {
  async create(data: Prisma.ExerciseUncheckedCreateInput) {
    await prisma.exercise.create({ data })
  }

  async findById(id: string) {
    const exercise = await prisma.exercise.findUnique({
      where: {
        id,
      },
    })

    return exercise
  }
}
