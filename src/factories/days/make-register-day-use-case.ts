import { PrismaDaysRepository } from '@src/repositories/prisma/prisma-days-repository'
import { RegisterDayUseCase } from '@src/use-cases/days/register-day-use-case'

export function makeRegisterDayUseCase() {
  const daysRepository = new PrismaDaysRepository()
  const useCase = new RegisterDayUseCase(daysRepository)

  return useCase
}
