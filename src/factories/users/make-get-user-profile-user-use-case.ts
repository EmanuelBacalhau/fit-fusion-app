import { PrismaUsersRepository } from '@src/repositories/prisma/prisma-users-repository'
import { GetProfileUserUseCase } from '@src/use-cases/users/get-profile-user-use-case'

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCasa = new GetProfileUserUseCase(prismaUserRepository)

  return useCasa
}
