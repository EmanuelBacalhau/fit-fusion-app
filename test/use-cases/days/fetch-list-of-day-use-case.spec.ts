import { describe, it, expect, beforeEach } from 'vitest'
import { InMemorDaysRepository } from '@in-memory/in-memory-days-repository'
import { FetchListOfDayUseCase } from '@src/use-cases/days/fetch-list-of-day-use-case'

let daysRepository: InMemorDaysRepository
let sut: FetchListOfDayUseCase

describe('Fetch list of day use case', () => {
  beforeEach(() => {
    daysRepository = new InMemorDaysRepository()
    sut = new FetchListOfDayUseCase(daysRepository)
  })

  it('should be able return list of day', async () => {
    await daysRepository.create({
      id: 'day-01',
      name: 'day',
    })

    const days = await sut.execute()

    expect(days).toHaveLength(1)
  })
})
