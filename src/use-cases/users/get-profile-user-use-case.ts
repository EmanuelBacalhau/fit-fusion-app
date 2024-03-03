import { UsersRepository } from '@repositories/interfaces/users-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'

interface GetProfileUserUseCaseRequest {
  userId: string
}

interface GetProfileUserUseCaseResponse {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    avatarUrl: string | null
  }
}

export class GetProfileUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetProfileUserUseCaseRequest): Promise<GetProfileUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user: {
        id: user.id,
        avatarUrl: user.avatarUrl,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    }
  }
}
