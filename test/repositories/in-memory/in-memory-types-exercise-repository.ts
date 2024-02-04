import { randomUUID } from 'crypto'
import { TypeExercise } from '@prisma/client'
import { TypesExerciseRepository } from '@repositories/interfaces/types-exercise-repository'

export class InMemoryTypesExerciseRepository
  implements TypesExerciseRepository
{
  public items: TypeExercise[] = []

  async create(data: TypeExercise) {
    this.items.push({
      ...data,
      id: !data.id ? randomUUID() : data.id,
    })
  }

  async findByName(name: string): Promise<boolean> {
    const day = this.items.find((item) => item.name === name)

    if (!day) {
      return false
    }

    return true
  }
}
