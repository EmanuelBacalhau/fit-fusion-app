import { resolve } from 'path'
import { app } from '@src/app'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

describe('Register user controller (e2e)', () => {
  it('should be able registe user', async () => {
    const avatar = resolve(__dirname, '../../utils/test.png')

    const response = await supertest(app)
      .post('/users')
      .attach('avatar', avatar)
      .field('firstName', 'John')
      .field('lastName', 'Doe')
      .field('email', 'johnDoe1@gmail.com')
      .field('password', '123456789')
      .field('gender', 'MALE')

    expect(response.status).toEqual(201)
  })
})
