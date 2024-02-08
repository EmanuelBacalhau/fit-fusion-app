import { describe, it, expect } from 'vitest'
import supertest from 'supertest'
import { app } from 'src/app'
import { resolve } from 'path'

describe('Register uses controller (e2e)', () => {
  it('should be able registe user', async () => {
    const avatar = resolve(__dirname, '../../../src/utils/test/test.png')

    const response = await supertest(app)
      .post('/users')
      .attach('avatar', avatar)
      .field('firstName', 'John')
      .field('lastName', 'Doe')
      .field('email', 'johnDoe@gmail.com')
      .field('password', '123456789')
      .field('phone', '88999999999')
      .field('weight', 80)
      .field('height', 1.75)
      .field('gender', 'MALE')

    expect(response.status).toEqual(201)
  })
})
