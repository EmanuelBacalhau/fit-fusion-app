import { Prisma } from '@prisma/client'

export interface ListOfUserHasExercises {
  id: string
  series: number
  repetitions: number
  exercise: {
    name: string
    coverUrl: string
  }
}

export interface UserHasExercisesRepository {
  create(data: Prisma.UserExerciseUncheckedCreateInput): Promise<void>
  findManyByDayIdAndUserId(
    userId: string,
    dayId: string,
  ): Promise<ListOfUserHasExercises[]>
}
