import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryTypesExerciseRepository } from '@in-memory/in-memory-types-exercise-repository'
import { InMemoryExercisesRepository } from '@in-memory/in-memory-exercises-repository'
import { RegisterExerciseUseCase } from '@use-cases/exercises/register-exercise-use-case'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'

let typesExerciseRepository: InMemoryTypesExerciseRepository
let exercisesRepository: InMemoryExercisesRepository
let sut: RegisterExerciseUseCase

describe('Register exercise use case', () => {
  beforeEach(() => {
    typesExerciseRepository = new InMemoryTypesExerciseRepository()
    exercisesRepository = new InMemoryExercisesRepository()
    sut = new RegisterExerciseUseCase(
      typesExerciseRepository,
      exercisesRepository,
    )
  })

  it('should be able register exercise', async () => {
    await typesExerciseRepository.create({
      id: 'type-1',
      name: 'Back',
    })

    await sut.execute({
      name: 'Back',
      coverUrl: 'cover.png',
      gifUrl: 'gif.png',
      typeId: 'type-1',
    })

    expect(exercisesRepository.items).toHaveLength(1)
  })

  it('should not be able register exercise with not exists type', async () => {
    await expect(() =>
      sut.execute({
        name: 'Back',
        coverUrl: 'cover.png',
        gifUrl: 'gif.png',
        typeId: 'type-1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
