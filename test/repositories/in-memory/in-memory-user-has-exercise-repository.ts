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
}
