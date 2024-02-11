import { app } from '@src/app'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

describe('Register day controller (e2e)', () => {
  it('should be able register day', async () => {
    await supertest(app)
      .post('/users')
      .field('firstName', 'John')
      .field('lastName', 'Doe')
      .field('email', 'johnDoe@gmail.com')
      .field('password', '123456789')
      .field('phone', '88999999998')
      .field('weight', 80)
      .field('height', 1.75)
      .field('gender', 'MALE')
      .field('role', 'ADMIN')

    const responseAuth = await supertest(app).post('/sessions').send({
      email: 'johnDoe@gmail.com',
      password: '123456789',
    })

    const response = await supertest(app)
      .post('/days')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .send({
        name: 'Monday',
      })

    expect(response.status).toEqual(201)
  })
})
