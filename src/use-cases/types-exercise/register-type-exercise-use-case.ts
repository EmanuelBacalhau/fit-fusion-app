import { TypesExerciseRepository } from '@repositories/interfaces/types-exercise-repository'

interface RegisterTypeExerciseUseCaseRequest {
  name: string
}

export class RegisterTypeExerciseUseCase {
  constructor(private typesExerciseRepository: TypesExerciseRepository) {}

  async execute({ name }: RegisterTypeExerciseUseCaseRequest) {
    const type = await this.typesExerciseRepository.findByName(name)

    if (type) {
      throw new Error('Is type in use')
    }

    await this.typesExerciseRepository.create({
      name,
    })
  }
}
