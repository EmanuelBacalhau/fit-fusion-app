import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUserHasExercisesRepository } from '@in-memory/in-memory-user-has-exercise-repository'
import { FetchListOfUserHasExerciseByDayUseCase } from '@use-cases/user-has-exercises/fetch-list-of-user-has-exercise-by-day-use-case'
import { InMemorDaysRepository } from '@in-memory/in-memory-days-repository'
import { InMemoryUsersRepository } from '@in-memory/in-memory-users-repository'

let userHasRepository: InMemoryUserHasExercisesRepository
let daysRepository: InMemorDaysRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchListOfUserHasExerciseByDayUseCase

describe('Fetch list of user has exercise use case', () => {
  beforeEach(() => {
    daysRepository = new InMemorDaysRepository()
    usersRepository = new InMemoryUsersRepository()
    userHasRepository = new InMemoryUserHasExercisesRepository()
    sut = new FetchListOfUserHasExerciseByDayUseCase(
      usersRepository,
      daysRepository,
      userHasRepository,
    )
  })

  it('should be able return list of user has exercise', async () => {
    for (let i = 1; i <= 2; i++) {
      await daysRepository.create({
        id: `${i}`,
        name: `day-${i}`,
      })
    }

    await usersRepository.create({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johnDoe@gmail.com',
      password: '123456789',
      gender: 'MALE',
      role: 'CLIENT',
      phone: '00000000000',
      height: 1.75,
      weight: 75,
      avatarUrl: 'test.png',
      created_at: new Date(),
    })

    for (let i = 1; i <= 2; i++) {
      await userHasRepository.create({
        id: `${1}`,
        series: 3,
        repetitions: 15,
        userId: '1',
        dayId: '1',
        exerciseId: 'exercise-id',
      })
    }

    await userHasRepository.create({
      id: '3',
      series: 2,
      repetitions: 15,
      userId: 'user-id',
      dayId: '2',
      exerciseId: 'exercise-id',
    })

    const { exercises } = await sut.execute({
      userId: '1',
      dayId: '1',
    })

    expect(exercises).toHaveLength(2)
  })
})
