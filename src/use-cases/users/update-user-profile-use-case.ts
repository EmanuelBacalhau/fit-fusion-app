import { UsersRepository } from '@repositories/interfaces/users-repository'
import { env } from '@src/env'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'
import { unlinkSync } from 'fs'
import { resolve } from 'path'

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

    if (data.avatarUrl && user.avatarUrl !== null) {
      const filename = user.avatarUrl.replace(
        `http://localhost:3333/uploads/avatars/`,
        '',
      )

      unlinkSync(resolve(__dirname, '../../../uploads/avatars', filename))
    }

    await this.usersRepository.update(userId, data)
  }
}
