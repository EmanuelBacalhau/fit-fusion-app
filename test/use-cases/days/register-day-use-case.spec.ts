import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterDayUseCase } from '@use-cases/days/register-day-use-case'
import { InMemorDaysRepository } from '@in-memory/in-memory-days-repository'
import { FieldInUseError } from '@use-cases/errors/field-in-use-error'

let daysRepository: InMemorDaysRepository
let sut: RegisterDayUseCase

describe('Register day use case', () => {
  beforeEach(() => {
    daysRepository = new InMemorDaysRepository()
    sut = new RegisterDayUseCase(daysRepository)
  })

  it('should be able register day', async () => {
    await sut.execute({
      name: 'day',
    })

    expect(daysRepository.items).toHaveLength(1)
  })

  it('should not be able register day (name duplicate)', async () => {
    await sut.execute({
      name: 'day',
    })

    await expect(() =>
      sut.execute({
        name: 'day',
      }),
    ).rejects.toBeInstanceOf(FieldInUseError)
  })
})
