import { randomUUID } from 'crypto'
import { Day } from '@prisma/client'
import { DaysRepository } from '@repositories/interfaces/days-repository'

export class InMemorDaysRepository implements DaysRepository {
  public items: Day[] = []

  async create(data: Day) {
    this.items.push({
      ...data,
      id: !data.id ? randomUUID() : data.id,
    })
  }

  async findById(id: string) {
    const day = this.items.find((item) => item.id === id)

    if (!day) {
      return null
    }

    return day
  }

  async findByName(name: string): Promise<boolean> {
    const day = this.items.find((item) => item.name === name)

    if (!day) {
      return false
    }

    return true
  }
}
