import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryTypesExerciseRepository } from '@in-memory/in-memory-types-exercise-repository'
import { RegisterTypeExerciseUseCase } from '@use-cases/types-exercise/register-type-exercise-use-case'

let typesExerciseRepository: InMemoryTypesExerciseRepository
let sut: RegisterTypeExerciseUseCase

describe('Register type exercise use case', () => {
  beforeEach(() => {
    typesExerciseRepository = new InMemoryTypesExerciseRepository()
    sut = new RegisterTypeExerciseUseCase(typesExerciseRepository)
  })

  it('should be able register type exercise', async () => {
    await sut.execute({
      name: 'type-exercise',
    })

    expect(typesExerciseRepository.items).toHaveLength(1)
  })

  it('should not be able register type exercise (name duplicate)', async () => {
    await sut.execute({
      name: 'type-exercise',
    })

    await expect(() =>
      sut.execute({
        name: 'type-exercise',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
