import { DaysRepository } from '@repositories/interfaces/days-repository'

interface RegisterDaysUseCaseRequest {
  name: string
}

export class RegisterDayUseCase {
  constructor(private daysRepository: DaysRepository) {}

  async execute({ name }: RegisterDaysUseCaseRequest) {
    const day = await this.daysRepository.findByName(name)

    if (day) {
      throw new Error('Is name in ')
    }

    await this.daysRepository.create({
      name,
    })
  }
}
