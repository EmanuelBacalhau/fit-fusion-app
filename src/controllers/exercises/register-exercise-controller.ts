import { env } from '@src/env'
import { makeRegisterExerciseUseCase } from '@src/factories/exercises/make-register-exercise-use-case'
import { ResourceNotFoundError } from '@src/use-cases/errors/resource-not-found-error'
import { Request, Response } from 'express'
import { unlinkSync } from 'fs'
import { resolve } from 'path'
import { ZodError, z } from 'zod'

export class RegisterExerciseController {
  async handle(request: Request, response: Response) {
    const registerBodySchema = z.object({
      name: z.string(),
      typeId: z.string().cuid(),
    })

    if (!request.files.cover[0] || !request.files.gif[0]) {
      return response.status(400).json({
        message: !request.files.cover[0]
          ? 'Cover is required'
          : 'Gif is required',
      })
    }

    const gifUrl = `${env.BASE_URL}/uploads/exercises/${request.files.gif[0].filename}`
    const coverUrl = `${env.BASE_URL}/uploads/exercises/${request.files.cover[0].filename}`

    try {
      const data = registerBodySchema.parse(request.body)

      const registerExerciseUseCase = makeRegisterExerciseUseCase()

      await registerExerciseUseCase.execute({
        ...data,
        gifUrl,
        coverUrl,
      })

      return response.status(201).end()
    } catch (error) {
      if (request.files.cover[0].filename || request.files.gif[0].filename) {
        unlinkSync(
          resolve(
            __dirname,
            '../../../uploads/exercises',
            request.files.cover[0].filename,
          ),
        )

        unlinkSync(
          resolve(
            __dirname,
            '../../../uploads/exercises',
            request.files.gif[0].filename,
          ),
        )
      }

      if (error instanceof ZodError) {
        return response.status(400).json({
          message: error.format(),
        })
      }

      if (error instanceof ResourceNotFoundError) {
        return response.status(error.status).json({
          message: error.message,
        })
      }

      throw error
    }
  }
}
