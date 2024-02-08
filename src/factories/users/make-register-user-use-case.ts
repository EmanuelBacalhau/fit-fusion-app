import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '@use-cases/users/register-user-use-case'

export function makeRegisterUserUseCase() {
  const primaUsersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUserUseCase(primaUsersRepository)

  return useCase
}
