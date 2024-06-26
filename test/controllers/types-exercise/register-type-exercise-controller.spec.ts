import { app } from '@src/app'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

describe('Register type exercise controller (e2e)', () => {
  it('should be able register type of exercise', async () => {
    await supertest(app)
      .post('/users')
      .field('firstName', 'John')
      .field('lastName', 'Doe')
      .field('email', 'johnDoe@gmail.com')
      .field('password', '123456789')
      .field('gender', 'MALE')
      .field('role', 'ADMIN')

    const responseAuth = await supertest(app).post('/sessions').send({
      email: 'johnDoe@gmail.com',
      password: '123456789',
    })

    const response = await supertest(app)
      .post('/types-exercise')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .send({
        name: 'Back',
      })

    expect(response.status).toEqual(201)
  })
})
