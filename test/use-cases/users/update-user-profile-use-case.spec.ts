import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@in-memory/in-memory-users-repository'
import { UpdateUserProfileUseCase } from '@use-cases/users/update-user-profile-use-case'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserProfileUseCase

describe('Update user profile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserProfileUseCase(usersRepository)
  })

  it('should be able update user profiule', async () => {
    await usersRepository.create({
      id: 'user-01',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johnDoe@gmail.com',
      password: '123456789',
      gender: 'MALE',
      role: 'CLIENT',
      avatarUrl: 'test.png',
      created_at: new Date(),
    })

    await sut.execute('user-01', {
      firstName: 'Update name',
    })

    expect(usersRepository.items[0].firstName).toEqual('Update name')
  })

  it('should not be able update user profile', async () => {
    await expect(() =>
      sut.execute('user-01', {
        firstName: 'Update name',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
