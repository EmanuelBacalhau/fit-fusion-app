import { makeRegisterHistoryUseCase } from '@src/factories/histories/make-register-history-use-case'
import { ResourceNotFoundError } from '@src/use-cases/errors/resource-not-found-error'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

export class RegisterHistoryController {
  async handle(request: Request, response: Response) {
    const registerBodySchema = z.object({
      exerciseId: z.string().cuid(),
    })

    try {
      const { exerciseId } = registerBodySchema.parse(request.body)

      const registerHistoryUseCase = makeRegisterHistoryUseCase()

      await registerHistoryUseCase.execute({
        exerciseId,
        userId: request.user.id,
        realizedIn: new Date(),
      })

      return response.status(201).end()
    } catch (error) {
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
