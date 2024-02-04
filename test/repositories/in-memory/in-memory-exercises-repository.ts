import { randomUUID } from 'crypto'
import { Exercise } from '@prisma/client'
import { ExercisesRepository } from '@repositories/interfaces/exercises-repository'

export class InMemoryExercisesRepository implements ExercisesRepository {
  public items: Exercise[] = []

  async create(data: Exercise) {
    this.items.push({
      ...data,
      id: !data.id ? randomUUID() : data.id,
    })
  }

  async findById(id: string) {
    const exercise = this.items.find((item) => (item.id = id))

    if (!exercise) {
      return null
    }

    return exercise
  }
}
