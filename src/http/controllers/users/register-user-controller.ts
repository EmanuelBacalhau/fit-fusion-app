import { z } from 'zod'
import { env } from 'src/env'
import { resolve } from 'path'
import { unlinkSync } from 'fs'
import { Request, Response } from 'express'
import { FieldInUseError } from '@use-cases/errors/field-in-use-error'
import { makeRegisterUserUseCase } from 'src/factories/users/make-register-user-use-case'

export class RegisterUserController {
  async handle(request: Request, response: Response) {
    const registerBodySchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
      weight: z.coerce.number(),
      height: z.coerce.number(),
      gender: z.enum(['FEMALE', 'MALE']),
      role: z.enum(['CLIENT', 'ADMIN']).default('CLIENT'),
    })

    let avatarUrl = null

    if (request.file) {
      avatarUrl = `${env.BASE_URL}/uploads/${request.file.filename}`
    }

    const data = registerBodySchema.parse(request.body)

    try {
      const registerUserUseCase = makeRegisterUserUseCase()

      await registerUserUseCase.execute({
        ...data,
        avatarUrl,
      })

      response.status(201).end()
    } catch (error) {
      if (request.file?.filename) {
        unlinkSync(
          resolve(__dirname, '../../../../uploads', request.file.filename),
        )
      }

      if (error instanceof FieldInUseError) {
        return response.status(error.status).json({
          message: error.message,
        })
      }
    }
  }
}
