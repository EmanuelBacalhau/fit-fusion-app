import { Prisma } from '@prisma/client'
import { prisma } from 'src/libs/prisma'
import { DaysRepository } from '../interfaces/days-repository'

export class PrismaTypesExerciseRepository implements DaysRepository {
  async create(data: Prisma.DayCreateInput) {
    await prisma.typeExercise.create({
      data,
    })
  }

  async findByName(name: string) {
    const type = await prisma.typeExercise.findUnique({
      where: {
        name,
      },
    })

    return !!type
  }

  async findById(id: string) {
    const type = await prisma.typeExercise.findUnique({
      where: {
        id,
      },
    })

    return type
  }
}
