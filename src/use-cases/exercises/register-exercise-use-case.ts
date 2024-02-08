import { ExercisesRepository } from '@repositories/interfaces/exercises-repository'
import { TypesExerciseRepository } from '@repositories/interfaces/types-exercise-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'

interface RegisterExerciseUseCaseRequest {
  name: string
  gifUrl: string
  coverUrl: string
  typeId: string
}

export class RegisterExerciseUseCase {
  constructor(
    private typesExerciseRepository: TypesExerciseRepository,
    private exercisesRepository: ExercisesRepository,
  ) {}

  async execute(data: RegisterExerciseUseCaseRequest) {
    const typeExercise = await this.typesExerciseRepository.findById(
      data.typeId,
    )

    if (!typeExercise) {
      throw new ResourceNotFoundError()
    }

    await this.exercisesRepository.create(data)
  }
}
