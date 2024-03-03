import { app } from '@src/app'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

describe('Fetch list of day controller (e2e)', () => {
  it('should be able return list of day', async () => {
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

    await supertest(app)
      .post('/days')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .send({
        name: 'Monday',
      })

    const response = await supertest(app)
      .get('/days')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.days).toHaveLength(1)
  })
})
