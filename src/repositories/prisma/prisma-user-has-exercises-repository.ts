import { Prisma } from '@prisma/client'
import {
  ListOfUserHasExercises,
  UserHasExercisesRepository,
} from '../interfaces/user-has-exercises-repository'
import { prisma } from '@src/libs/prisma'

export class PrismaUserHasExercisesRepository
  implements UserHasExercisesRepository
{
  async create(data: Prisma.UserExerciseUncheckedCreateInput) {
    await prisma.userExercise.create({
      data,
    })
  }

  async findManyByDayIdAndUserId(
    userId: string,
    dayId: string,
  ): Promise<ListOfUserHasExercises[]> {
    const userHasExercises = await prisma.userExercise.findMany({
      where: {
        userId,
        dayId,
      },
      select: {
        id: true,
        series: true,
        repetitions: true,
        exercise: {
          select: {
            id: true,
            name: true,
            coverUrl: true,
          },
        },
      },
    })

    return userHasExercises
  }
}
