import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { UpdateUserProfileUseCase } from '@src/use-cases/users/update-user-profile-use-case'

export function makeUpdateUserProfileUseCase() {
  const primaUsersRepository = new PrismaUsersRepository()
  const useCase = new UpdateUserProfileUseCase(primaUsersRepository)

  return useCase
}
