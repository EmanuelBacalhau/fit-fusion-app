import { app } from '@src/app'
import { resolve } from 'path'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

describe('Get user profile controller (e2e)', () => {
  it('should be able get user profile', async () => {
    const avatar = resolve(__dirname, '../../../src/utils/test/test.png')

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

    const responseAuth = await supertest(app).post('/sessions').send({
      email: 'johnDoe@gmail.com',
      password: '123456789',
    })

    const response = await supertest(app)
      .get('/me')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.user).toEqual(expect.any(Object))
  })
})
