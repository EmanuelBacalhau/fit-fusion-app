import { UsersRepository } from '@repositories/interfaces/users-repository'
import { InvalidCrediantialsError } from '@use-cases/errors/crediantials-invalid-error'
import { compare } from 'bcryptjs'

export interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

export interface AuthenticateUserUseCaseResponse {
  userId: string
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateUserUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCrediantialsError()
    }

    const passwordHash = await compare(password, user.password)

    if (!passwordHash) {
      throw new InvalidCrediantialsError()
    }

    return {
      userId: user.id,
    }
  }
}
