import { randomUUID } from 'crypto'
import { UserExercise } from '@prisma/client'
import { UserHasExercisesRepository } from '@repositories/interfaces/user-has-exercises-repository'

export class InMemoryUserHasExercisesRepository
  implements UserHasExercisesRepository
{
  public items: UserExercise[] = []

  async create(data: UserExercise) {
    this.items.push({
      ...data,
      id: !data.id ? randomUUID() : data.id,
    })
  }

  async findManyByDayIdAndUserId(userId: string, dayId: string) {
    const exercises = this.items
      .filter((item) => item.userId === userId && item.dayId === dayId)
      .map((item) => ({
        id: item.id,
        series: item.series,
        repetitions: item.repetitions,
        exercise: {
          id: 'exercise-01',
          name: 'Exercise',
          coverUrl: 'cover.png',
          gifUrl: 'gif.png',
        },
      }))

    return exercises
  }
}
