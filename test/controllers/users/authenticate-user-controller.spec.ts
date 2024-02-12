import { app } from '@src/app'
import { resolve } from 'path'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

describe('Authenticate user controller (e2e)', () => {
  it('should be able authenticate user', async () => {
    const avatar = resolve(__dirname, '../../utils/test.png')

    await supertest(app)
      .post('/users')
      .attach('avatar', avatar)
      .field('firstName', 'John')
      .field('lastName', 'Doe')
      .field('email', 'johnDoe@gmail.com')
      .field('password', '123456789')
      .field('phone', '88999999998')
      .field('weight', 80)
      .field('height', 1.75)
      .field('gender', 'MALE')

    const response = await supertest(app).post('/sessions').send({
      email: 'johnDoe@gmail.com',
      password: '123456789',
    })

    expect(response.status).toEqual(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
