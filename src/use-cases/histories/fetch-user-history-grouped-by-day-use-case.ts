import {
  HistoriesRepository,
  UserHistoryByUserIdResponse,
} from '@repositories/interfaces/histories-repository'
import { UsersRepository } from '@repositories/interfaces/users-repository'

interface FetchUserHistoryGroupedByDayUseCaseRequest {
  userId: string
}

interface FetchUserHistoryGroupedByDayUseCaseResponse {
  history: UserHistoryByUserIdResponse[]
}

export class FetchUserHistoryUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private historiesRepository: HistoriesRepository,
  ) {}

  async execute({
    userId,
  }: FetchUserHistoryGroupedByDayUseCaseRequest): Promise<FetchUserHistoryGroupedByDayUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('Resource not found')
    }

    const history = await this.historiesRepository.findManyByUserId(userId)

    return {
      history,
    }
  }
}
