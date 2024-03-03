import { PrismaDaysRepository } from '@src/repositories/prisma/prisma-days-repository'
import { FetchListOfDayUseCase } from '@src/use-cases/days/fetch-list-of-day-use-case'

export function makeFetchListOfDayUseCase() {
  const daysRepository = new PrismaDaysRepository()
  const useCase = new FetchListOfDayUseCase(daysRepository)

  return useCase
}
