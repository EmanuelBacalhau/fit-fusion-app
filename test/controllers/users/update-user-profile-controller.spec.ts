import { resolve } from 'path'
import { app } from '@src/app'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

describe('Update user profile controller (e2e)', () => {
  it('should be able update user profile', async () => {
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
      .patch('/users')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .attach('avatar', avatar)

    expect(response.status).toEqual(204)
  })
})
