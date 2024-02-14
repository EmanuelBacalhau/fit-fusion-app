import { app } from '@src/app'
import { prisma } from '@src/libs/prisma'
import { resolve } from 'path'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'

describe('Register user exercises controller (e2e)', () => {
  it('should be able register user exercises', async () => {
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

    await supertest(app)
      .post('/types-exercise')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .send({
        name: 'Back',
      })

    await supertest(app)
      .post('/days')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .send({
        name: 'Monday',
      })

    const path = resolve(__dirname, '../../utils/test.png')

    const types = await prisma.typeExercise.findMany()

    await supertest(app)
      .post('/exercises')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .attach('cover', path)
      .attach('gif', path)
      .field('name', 'Board')
      .field('typeId', types[0].id)

    const exercises = await prisma.exercise.findMany()

    const response = await supertest(app)
      .post('/histories')
      .auth(responseAuth.body.token, { type: 'bearer' })
      .send({
        exerciseId: exercises[0].id,
      })

    expect(response.status).toEqual(201)
  })
})
