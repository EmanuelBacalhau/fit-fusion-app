import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterDayUseCase } from '@use-cases/days/register-day-use-case'
import { InMemorDaysRepository } from '@in-memory/in-memory-days-repository'

let daysRepository: InMemorDaysRepository
let sut: RegisterDayUseCase

describe('Register user use case', () => {
  beforeEach(() => {
    daysRepository = new InMemorDaysRepository()
    sut = new RegisterDayUseCase(daysRepository)
  })

  it('should be able register user', async () => {
    await sut.execute({
      name: 'day',
    })

    expect(daysRepository.items).toHaveLength(1)
  })

  it('should not be able register user (phone or email duplicate)', async () => {
    await sut.execute({
      name: 'day',
    })

    await expect(() =>
      sut.execute({
        name: 'day',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
