import { describe, it, expect, beforeEach } from 'vitest'
import { AuthenticateUserUseCase } from '@use-cases/users/authenticate-user-use-case'
import { InMemoryUsersRepository } from '@in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })
  it('should be able register user', async () => {
    await usersRepository.create({
      id: '123456',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johnDoe@gmail.com',
      password: await hash('123456789', 5),
      gender: 'MALE',
      role: 'CLIENT',
      phone: '00000000000',
      height: 1.75,
      weight: 75,
      avatarUrl: 'test.png',
      created_at: new Date(),
    })

    const { userId } = await sut.execute({
      email: 'johnDoe@gmail.com',
      password: '123456789',
    })

    expect(userId).toEqual(expect.any(String))
  })
})
