import { ZodError, z } from 'zod'
import { env } from 'src/env'
import { resolve } from 'path'
import { unlinkSync } from 'fs'
import { Request, Response } from 'express'
import { FieldInUseError } from '@use-cases/errors/field-in-use-error'
import { makeRegisterUserUseCase } from '@factories/users/make-register-user-use-case'

export class RegisterUserController {
  async handle(request: Request, response: Response) {
    const registerBodySchema = z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
      gender: z.enum(['FEMALE', 'MALE']),
      role: z.enum(['CLIENT', 'ADMIN']).default('CLIENT'),
    })

    let avatarUrl = null

    if (request.file) {
      avatarUrl = `${env.BASE_URL}/uploads/avatars/${request.file.filename}`
    }

    try {
      const data = registerBodySchema.parse(request.body)

      const registerUserUseCase = makeRegisterUserUseCase()

      await registerUserUseCase.execute({
        ...data,
        avatarUrl,
      })

      response.status(201).end()
    } catch (error) {
      if (request.file?.filename) {
        unlinkSync(
          resolve(__dirname, '../../../uploads/avatars', request.file.filename),
        )
      }

      if (error instanceof ZodError) {
        return response.status(400).json({
          message: error.format(),
        })
      }

      if (error instanceof FieldInUseError) {
        return response.status(error.status).json({
          message: error.message,
        })
      }

      throw error
    }
  }
}
