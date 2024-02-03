import { hash } from 'bcryptjs'
import { $Enums } from '@prisma/client'
import { UsersRepository } from '../../repositories/interfaces/users-repository'

export interface RegisterUserUseCaseRequest {
  avatarUrl?: string
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  weight: number
  height: number
  gender: $Enums.Gender
  role?: $Enums.Role
}

export class RegisterUserUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(data: RegisterUserUseCaseRequest) {
    const passwordHash = await hash(data.password, 6)

    await this.userRepository.create({
      ...data,
      password: passwordHash,
    })
  }
}
