import { UsersRepository } from '@repositories/interfaces/users-repository'

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
      throw new Error('Resource not found')
    }

    await this.usersRepository.update(userId, data)
  }
}
