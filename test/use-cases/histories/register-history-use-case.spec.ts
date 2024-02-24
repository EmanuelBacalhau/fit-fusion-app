import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@in-memory/in-memory-users-repository'
import { InMemoryExercisesRepository } from '@in-memory/in-memory-exercises-repository'
import { RegisterHistoryUseCase } from '@use-cases/histories/register-history-use-case'
import { InMemoryHistoriesRepository } from '@in-memory/in-memory-histories-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let exercisesRepository: InMemoryExercisesRepository
let historiesRepository: InMemoryHistoriesRepository
let sut: RegisterHistoryUseCase

describe('Register history use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    exercisesRepository = new InMemoryExercisesRepository()
    historiesRepository = new InMemoryHistoriesRepository()
    sut = new RegisterHistoryUseCase(
      exercisesRepository,
      usersRepository,
      historiesRepository,
    )
  })

  it('should be able register history', async () => {
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

    exercisesRepository.create({
      id: 'exercise-1',
      coverUrl: 'cover.png',
      gifUrl: 'gif.png',
      name: 'Back',
      typeId: 'type-1',
    })

    await sut.execute({
      exerciseId: 'exercise-1',
      userId: 'user-1',
      realizedIn: new Date(),
    })

    expect(historiesRepository.items).toHaveLength(1)
  })

  it('should not be able register exercise with not exists exercise or user', async () => {
    await expect(() =>
      sut.execute({
        exerciseId: '1',
        userId: '1',
        realizedIn: new Date(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
