import { UsersRepository } from '@repositories/interfaces/users-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'

interface UpdateUserProfileUseCaseRequest {
  avatarUrl?: string | null
  firstName?: string
  lastName?: string
  password?: string
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(userId: string, data: UpdateUserProfileUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.update(userId, data)
  }
}
