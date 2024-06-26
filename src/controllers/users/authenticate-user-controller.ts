import { ZodError, z } from 'zod'
import { env } from '@src/env'
import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'
import { makeAuthenticateUserUseCase } from '@src/factories/users/make-authenticate-user-use-case'
import { InvalidCrediantialsError } from '@src/use-cases/errors/crediantials-invalid-error'

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })

    try {
      const data = authenticateBodySchema.parse(request.body)

      const authenticateUserUseCase = makeAuthenticateUserUseCase()

      const userData = await authenticateUserUseCase.execute(data)

      const token = sign({ role: userData.role }, env.JWT_SECRET, {
        subject: userData.userId,
      })

      return response.status(200).json({ token })
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({
          message: error.format(),
        })
      }

      if (error instanceof InvalidCrediantialsError) {
        return response.status(error.status).json({
          message: error.message,
        })
      }

      throw error
    }
  }
}
