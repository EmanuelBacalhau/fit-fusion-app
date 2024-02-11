import { Prisma } from '@prisma/client'
import { prisma } from 'src/libs/prisma'
import { DaysRepository } from '../interfaces/days-repository'

export class PrismaDaysRepository implements DaysRepository {
  async create(data: Prisma.DayCreateInput) {
    await prisma.day.create({
      data,
    })
  }

  async findByName(name: string) {
    const day = await prisma.day.findUnique({
      where: {
        name,
      },
    })

    return !!day
  }

  async findById(id: string) {
    const day = await prisma.day.findUnique({
      where: {
        id,
      },
    })

    return day
  }
}
