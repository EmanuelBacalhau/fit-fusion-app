import { Prisma } from '@prisma/client'
import {
  HistoriesRepository,
  UserHistoryByUserIdResponse,
} from '../interfaces/histories-repository'
import { prisma } from '@src/libs/prisma'
import dayjs from 'dayjs'

export class PrismaHistoriesRepository implements HistoriesRepository {
  async create(data: Prisma.HistoryUncheckedCreateInput) {
    await prisma.history.create({
      data,
    })
  }

  async findManyByUserId(
    userId: string,
  ): Promise<UserHistoryByUserIdResponse[]> {
    const histories = await prisma.history.findMany({
      where: {
        userId,
      },
      select: {
        realizedIn: true,
        exercise: {
          select: {
            name: true,
            typeExercise: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    const days = histories.reduce((accumulator, currentValue) => {
      const formattedDay = dayjs(currentValue.realizedIn).format('DD.MM.YYYY')

      if (!accumulator.includes(formattedDay)) {
        accumulator.push(formattedDay)
      }

      return accumulator
    }, [] as string[])

    const history = days.map((day) => {
      const filterByDay = histories
        .filter((history) => {
          const formattedDay = dayjs(history.realizedIn).format('DD.MM.YYYY')
          return formattedDay === day
        })
        .map((history) => ({
          hour: dayjs(history.realizedIn).format('HH:mm'),
          exercise: {
            name: history.exercise.name,
            type: {
              name: history.exercise.typeExercise.name,
            },
          },
        }))

      return {
        title: day,
        history: filterByDay,
      }
    })

    return history
  }
}
