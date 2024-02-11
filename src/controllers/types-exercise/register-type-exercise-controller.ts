import { ZodError, z } from 'zod'
import { Request, Response } from 'express'
import { FieldInUseError } from '@src/use-cases/errors/field-in-use-error'
import { makeRegisterTypeExerciseUseCase } from '@src/factories/types-exercise/make-register-type-exercise-use-case'

export class RegisterTypesExerciseController {
  async handle(request: Request, response: Response) {
    const registerBodySchema = z.object({
      name: z.string(),
    })

    try {
      const data = registerBodySchema.parse(request.body)

      const registerTypesExerciseUseCase = makeRegisterTypeExerciseUseCase()

      await registerTypesExerciseUseCase.execute(data)

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
