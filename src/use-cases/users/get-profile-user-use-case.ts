import { UsersRepository } from '@repositories/interfaces/users-repository'

interface GetProfileUserUseCaseRequest {
  userId: string
}

interface GetProfileUserUseCaseResponse {
  user: {
    email: string
    firstName: string
    lastName: string
    avatarUrl: string
  }
}

export class GetProfileUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetProfileUserUseCaseRequest): Promise<GetProfileUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('Resource not found')
    }

    return {
      user,
    }
  }
}
