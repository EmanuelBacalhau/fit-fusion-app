import { DaysRepository } from '@repositories/interfaces/days-repository'
import { ExercisesRepository } from '@repositories/interfaces/exercises-repository'
import { UserHasExercisesRepository } from '@repositories/interfaces/user-has-exercises-repository'
import { UsersRepository } from '@repositories/interfaces/users-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'

interface RegisterUserHasExerciseUseCaseRequest {
  series: number
  repetitions: number
  exerciseId: string
  userId: string
  dayId: string
}

export class RegisterUserHasExerciseUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private exercisesRepository: ExercisesRepository,
    private daysRepository: DaysRepository,
    private userHasExercises: UserHasExercisesRepository,
  ) {}

  async execute(data: RegisterUserHasExerciseUseCaseRequest) {
    const user = await this.usersRepository.findById(data.userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const exercises = await this.exercisesRepository.findById(data.exerciseId)

    if (!exercises) {
      throw new ResourceNotFoundError()
    }

    const day = await this.daysRepository.findById(data.dayId)

    if (!day) {
      throw new ResourceNotFoundError()
    }

    await this.userHasExercises.create(data)
  }
}
