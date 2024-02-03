import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@in-memory/in-memory-users-repository'
import { GetProfileUserUseCase } from '@use-cases/users/get-profile-user-use-case'

let usersRepository: InMemoryUsersRepository
let sut: GetProfileUserUseCase

describe('Get profile user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetProfileUserUseCase(usersRepository)
  })
  it('should be able register user', async () => {
    await usersRepository.create({
      id: 'user-id',
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

    const { user } = await sut.execute({ userId: 'user-id' })

    expect(user.email).toEqual(expect.any(String))
  })
})
