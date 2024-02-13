import { makeRegisterUserHasExerciseUseCase } from '@src/factories/user-has-exercises/make-register-user-has-exercise'
import { ResourceNotFoundError } from '@src/use-cases/errors/resource-not-found-error'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

export class RegisterUserHasExerciseController {
  async handle(request: Request, response: Response) {
    const registerBodySchema = z.object({
      series: z.coerce.number(),
      repetitions: z.coerce.number(),
      exerciseId: z.string().cuid(),
      userId: z.string().cuid(),
      dayId: z.string().cuid(),
    })

    try {
      const data = registerBodySchema.parse(request.body)

      const registeruserHasExerciseUseCase =
        makeRegisterUserHasExerciseUseCase()

      await registeruserHasExerciseUseCase.execute(data)

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
