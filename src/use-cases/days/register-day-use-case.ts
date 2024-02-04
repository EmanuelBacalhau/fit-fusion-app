import { DaysRepository } from '@repositories/interfaces/days-repository'

interface RegisterDayUseCaseRequest {
  name: string
}

export class RegisterDayUseCase {
  constructor(private daysRepository: DaysRepository) {}

  async execute({ name }: RegisterDayUseCaseRequest) {
    const day = await this.daysRepository.findByName(name)

    if (day) {
      throw new Error('Is name in use')
    }

    await this.daysRepository.create({
      name,
    })
  }
}
