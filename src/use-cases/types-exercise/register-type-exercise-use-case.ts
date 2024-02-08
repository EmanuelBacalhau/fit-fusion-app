import { TypesExerciseRepository } from '@repositories/interfaces/types-exercise-repository'
import { FieldInUseError } from '@use-cases/errors/field-in-use-error'

interface RegisterTypeExerciseUseCaseRequest {
  name: string
}

export class RegisterTypeExerciseUseCase {
  constructor(private typesExerciseRepository: TypesExerciseRepository) {}

  async execute({ name }: RegisterTypeExerciseUseCaseRequest) {
    const type = await this.typesExerciseRepository.findByName(name)

    if (type) {
      throw new FieldInUseError()
    }

    await this.typesExerciseRepository.create({
      name,
    })
  }
}
