import { UsersRepository } from '@repositories/interfaces/users-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'
import { hash } from 'bcryptjs'
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
        `${process.env.BASE_URL}/uploads/avatars/`,
        '',
      )

      unlinkSync(resolve(__dirname, '../../../uploads/avatars', filename))
    }

    const passwordHash = data.password && (await hash(data.password, 6))

    await this.usersRepository.update(userId, {
      ...data,
      password: passwordHash,
    })
  }
}
