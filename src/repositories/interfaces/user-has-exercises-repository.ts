import { Prisma } from '@prisma/client'

export interface ListOfUserHasExercises {
  id: string
  series: number
  repetitions: number
  exercise: {
    id: string
    name: string
    coverUrl: string
    gifUrl: string
  }
}

export interface UserHasExercisesRepository {
  create(data: Prisma.UserExerciseUncheckedCreateInput): Promise<void>
  findManyByDayIdAndUserId(
    userId: string,
    dayId: string,
  ): Promise<ListOfUserHasExercises[]>
}
