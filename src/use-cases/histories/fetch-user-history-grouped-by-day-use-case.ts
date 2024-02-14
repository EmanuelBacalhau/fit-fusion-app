import {
  HistoriesRepository,
  UserHistoryByUserIdResponse,
} from '@repositories/interfaces/histories-repository'
import { UsersRepository } from '@repositories/interfaces/users-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'

interface FetchUserHistoryGroupedByDayUseCaseRequest {
  userId: string
}

interface FetchUserHistoryGroupedByDayUseCaseResponse {
  history: UserHistoryByUserIdResponse[]
}

export class FetchUserHistoryGroupedByDayUseUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private historiesRepository: HistoriesRepository,
  ) {}

  async execute({
    userId,
  }: FetchUserHistoryGroupedByDayUseCaseRequest): Promise<FetchUserHistoryGroupedByDayUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const history = await this.historiesRepository.findManyByUserId(userId)

    return {
      history,
    }
  }
}
