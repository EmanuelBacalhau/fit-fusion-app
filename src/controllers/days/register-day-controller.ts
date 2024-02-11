import { makeRegisterDayUseCase } from '@src/factories/days/make-register-day-use-case'
import { FieldInUseError } from '@src/use-cases/errors/field-in-use-error'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

export class RegisterDayController {
  async handle(request: Request, response: Response) {
    const registerBodySchema = z.object({
      name: z.string(),
    })

    try {
      const registerDayUseCase = makeRegisterDayUseCase()

      const data = registerBodySchema.parse(request.body)

      await registerDayUseCase.execute(data)

      return response.status(201).end()
    } catch (error) {
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
