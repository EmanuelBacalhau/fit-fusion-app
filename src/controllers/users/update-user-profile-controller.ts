import { ZodError, z } from 'zod'
import { env } from 'src/env'
import { resolve } from 'path'
import { unlinkSync } from 'fs'
import { Request, Response } from 'express'
import { ResourceNotFoundError } from '@src/use-cases/errors/resource-not-found-error'
import { makeUpdateUserProfileUseCase } from '@src/factories/users/make-update-user-profile-use-case'

export class UpdateUserProfileController {
  async handle(request: Request, response: Response) {
    const updateBodySchema = z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      password: z.string().min(8).optional(),
    })

    let avatarUrl

    if (request.file) {
      avatarUrl = `${env.BASE_URL}/uploads/avatars/${request.file.filename}`
    }

    try {
      const data = updateBodySchema.parse(request.body)

      const updateUserProfileUseCase = makeUpdateUserProfileUseCase()

      await updateUserProfileUseCase.execute(request.user.id, {
        ...data,
        avatarUrl,
      })

      return response.status(204).end()
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

      if (error instanceof ResourceNotFoundError) {
        return response.status(error.status).json({
          message: error.message,
        })
      }

      throw error
    }
  }
}
