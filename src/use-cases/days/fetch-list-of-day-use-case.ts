import { DaysRepository } from '@src/repositories/interfaces/days-repository'

export class FetchListOfDayUseCase {
  constructor(private daysRepository: DaysRepository) {}

  async execute() {
    const days = await this.daysRepository.findMany()

    return days
  }
}
