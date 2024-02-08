import { DaysRepository } from '@repositories/interfaces/days-repository'
import {
  ListOfUserHasExercises,
  UserHasExercisesRepository,
} from '@repositories/interfaces/user-has-exercises-repository'
import { UsersRepository } from '@repositories/interfaces/users-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'

interface FetchListOfUserHasExerciseByDayUseCaseRequest {
  userId: string
  dayId: string
}

interface FetchListOfUserHasExerciseByDayUseCaseResponse {
  exercises: ListOfUserHasExercises[]
}

export class FetchListOfUserHasExerciseByDayUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private daysRepository: DaysRepository,
    private userHasExercisesRepository: UserHasExercisesRepository,
  ) {}

  async execute({
    userId,
    dayId,
  }: FetchListOfUserHasExerciseByDayUseCaseRequest): Promise<FetchListOfUserHasExerciseByDayUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const day = await this.daysRepository.findById(dayId)

    if (!day) {
      throw new ResourceNotFoundError()
    }

    const exercises =
      await this.userHasExercisesRepository.findManyByDayIdAndUserId(
        userId,
        dayId,
      )

    return { exercises }
  }
}
