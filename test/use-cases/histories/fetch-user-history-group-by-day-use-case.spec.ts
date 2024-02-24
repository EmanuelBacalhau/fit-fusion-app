import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryHistoriesRepository } from '@in-memory/in-memory-histories-repository'
import { InMemoryUsersRepository } from '@in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'
import { FetchUserHistoryGroupedByDayUseUseCase } from '@src/use-cases/histories/fetch-user-history-grouped-by-day-use-case'

let usersRepository: InMemoryUsersRepository
let historiesRepository: InMemoryHistoriesRepository
let sut: FetchUserHistoryGroupedByDayUseUseCase

describe('Fetch list history group by day use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    historiesRepository = new InMemoryHistoriesRepository()
    sut = new FetchUserHistoryGroupedByDayUseUseCase(
      usersRepository,
      historiesRepository,
    )
  })

  it('should be able return list history group by day', async () => {
    usersRepository.create({
      id: 'user-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johnDoe@gmail.com',
      password: '123456789',
      gender: 'MALE',
      role: 'CLIENT',
      avatarUrl: 'test.png',
      created_at: new Date(),
    })

    await historiesRepository.create({
      id: 'history-1',
      exerciseId: 'exercise-1',
      userId: 'user-1',
      realizedIn: new Date(),
    })

    await historiesRepository.create({
      id: 'history-2',
      exerciseId: 'exercise-1',
      userId: 'user-1',
      realizedIn: new Date(),
    })

    await historiesRepository.create({
      id: 'history-3',
      exerciseId: 'exercise-1',
      userId: 'user-1',
      realizedIn: new Date('2024-01-01'),
    })

    const { history } = await sut.execute({ userId: 'user-1' })

    expect(history).toHaveLength(2)
    expect(history[0].history).toHaveLength(2)
  })

  it('should not be able register exercise with not exists user', async () => {
    await expect(() =>
      sut.execute({
        userId: '1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
