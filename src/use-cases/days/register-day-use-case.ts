import { DaysRepository } from '@repositories/interfaces/days-repository'
import { FieldInUseError } from '@use-cases/errors/field-in-use-error'

interface RegisterDayUseCaseRequest {
  name: string
}

export class RegisterDayUseCase {
  constructor(private daysRepository: DaysRepository) {}

  async execute({ name }: RegisterDayUseCaseRequest) {
    const day = await this.daysRepository.findByName(name)

    if (day) {
      throw new FieldInUseError()
    }

    await this.daysRepository.create({
      name,
    })
  }
}
