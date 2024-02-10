import { PrismaUsersRepository } from '@src/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '@src/use-cases/users/authenticate-user-use-case'

export function makeAuthenticateUserUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCasa = new AuthenticateUserUseCase(prismaUserRepository)

  return useCasa
}
