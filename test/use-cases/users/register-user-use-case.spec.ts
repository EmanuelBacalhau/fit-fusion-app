import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUserUseCase } from '@use-cases/users/register-user-use-case'
import { InMemoryUsersRepository } from '@in-memory/in-memory-users-repository'
import { FieldInUseError } from '@use-cases/errors/field-in-use-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able register user', async () => {
    await sut.execute({
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
    })

    expect(usersRepository.items).toHaveLength(1)
  })

  it('should not be able register user (phone or email duplicate)', async () => {
    await sut.execute({
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
    })

    await expect(() =>
      sut.execute({
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
      }),
    ).rejects.toBeInstanceOf(FieldInUseError)
  })
})
