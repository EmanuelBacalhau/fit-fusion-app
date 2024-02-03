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
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: RegisterUserUseCaseRequest) {
    const emailInuse = await this.usersRepository.findByEmail(data.email)

    if (emailInuse) {
      throw new Error('Is email in use')
    }

    const phoneInUse = await this.usersRepository.findByPhone(data.phone)

    if (phoneInUse) {
      throw new Error('Is phone in use')
    }

    const passwordHash = await hash(data.password, 6)

    await this.usersRepository.create({
      ...data,
      password: passwordHash,
    })
  }
}
