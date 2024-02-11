import { makeRegisterDayUseCase } from '@src/factories/days/make-register-day-use-case'
import { FieldInUseError } from '@src/use-cases/errors/field-in-use-error'
import { Request, Response } from 'express'
import { z } from 'zod'

export class RegisterDayController {
  async handle(request: Request, response: Response) {
    const registerBodySchema = z.object({
      name: z.string(),
    })

    const data = registerBodySchema.parse(request.body)

    try {
      const registerDayUseCase = makeRegisterDayUseCase()

      await registerDayUseCase.execute(data)

      return response.status(201).end()
    } catch (error) {
      if (error instanceof FieldInUseError) {
        return response.status(error.status).json({
          message: error.message,
        })
      }

      throw error
    }
  }
}
