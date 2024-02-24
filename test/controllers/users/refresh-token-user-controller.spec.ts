import { app } from '@src/app'
import { resolve } from 'path'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

describe('Refresh token users controller (e2e)', () => {
  it('should be able refresh token', async () => {
    const avatar = resolve(__dirname, '../../utils/test.png')

    await supertest(app)
      .post('/users')
      .attach('avatar', avatar)
      .field('firstName', 'John')
      .field('lastName', 'Doe')
      .field('email', 'johnDoe@gmail.com')
      .field('password', '123456789')
      .field('gender', 'MALE')

    const responseAuth = await supertest(app).post('/sessions').send({
      email: 'johnDoe@gmail.com',
      password: '123456789',
    })

    const response = await supertest(app)
      .patch('/token/refresh')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
