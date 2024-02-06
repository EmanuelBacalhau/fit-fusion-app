import { ExercisesRepository } from '@repositories/interfaces/exercises-repository'
import { HistoriesRepository } from '@repositories/interfaces/histories-repository'
import { UsersRepository } from '@repositories/interfaces/users-repository'

interface FetchListOfHistoryUseCaseRequest {
  userId: string
  exerciseId: string
  realizedIn: Date
}

export class RegisterHistoryUseCase {
  constructor(
    private exercisesRepository: ExercisesRepository,
    private usersRepository: UsersRepository,
    private historiesRepository: HistoriesRepository,
  ) {}

  async execute({
    exerciseId,
    userId,
    realizedIn,
  }: FetchListOfHistoryUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('Resource not found')
    }

    const exercise = await this.exercisesRepository.findById(exerciseId)

    if (!exercise) {
      throw new Error('Resource not found')
    }

    await this.historiesRepository.create({
      userId,
      exerciseId,
      realizedIn,
    })
  }
}
