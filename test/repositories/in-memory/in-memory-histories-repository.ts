import { History } from '@prisma/client'
import { HistoriesRepository } from '@repositories/interfaces/histories-repository'

export class InMemoryHistoriesRepository implements HistoriesRepository {
  public items: History[] = []

  async create(data: History) {
    this.items.push(data)
  }
}
