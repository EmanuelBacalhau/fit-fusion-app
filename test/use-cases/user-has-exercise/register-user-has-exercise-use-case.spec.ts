import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryExercisesRepository } from '@in-memory/in-memory-exercises-repository'
import { InMemorDaysRepository } from '@in-memory/in-memory-days-repository'
import { InMemoryUsersRepository } from '@in-memory/in-memory-users-repository'
import { InMemoryUserHasExercisesRepository } from '@in-memory/in-memory-user-has-exercise-repository'
import { RegisterUserHasExerciseUseCase } from '@use-cases/user-has-exercises/register-user-has-exercise-use-case'

let daysRepository: InMemorDaysRepository
let usersRepository: InMemoryUsersRepository
let exercisesRepository: InMemoryExercisesRepository
let userHasRepository: InMemoryUserHasExercisesRepository
let sut: RegisterUserHasExerciseUseCase

describe('Register user has exercise use case', () => {
  beforeEach(() => {
    daysRepository = new InMemorDaysRepository()
    usersRepository = new InMemoryUsersRepository()
    exercisesRepository = new InMemoryExercisesRepository()
    userHasRepository = new InMemoryUserHasExercisesRepository()
    sut = new RegisterUserHasExerciseUseCase(
      usersRepository,
      exercisesRepository,
      daysRepository,
      userHasRepository,
    )
  })

  it('should be able register exercise', async () => {
    daysRepository.create({
      id: 'day-1',
      name: 'Monday',
    })

    usersRepository.create({
      id: 'user-1',
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

    exercisesRepository.create({
      id: 'exercise-1',
      coverUrl: 'cover.png',
      gifUrl: 'gif.png',
      name: 'Back',
      typeId: 'type-1',
    })

    await sut.execute({
      series: 3,
      repetitions: 15,
      dayId: 'day-1',
      userId: 'user-1',
      exerciseId: 'exercise-1',
    })

    expect(userHasRepository.items).toHaveLength(1)
  })

  it('should not be able register exercise with not exists day or user or exercise', async () => {
    await expect(() =>
      sut.execute({
        series: 3,
        repetitions: 15,
        dayId: 'day-1',
        userId: 'user-1',
        exerciseId: 'exercise-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
