import { env } from '@src/env'
import { makeAuthenticateUserUseCase } from '@src/factories/users/make-authenticate-user-use-case'
import { ErrorHandling } from '@src/use-cases/errors/error-handling'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import { z } from 'zod'

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })

    const data = authenticateBodySchema.parse(request.body)

    try {
      const authenticateUserUseCase = makeAuthenticateUserUseCase()

      const userData = await authenticateUserUseCase.execute(data)

      const token = sign({ role: userData.role }, env.JWT_SECRET, {
        subject: userData.userId,
      })

      return response.status(200).json({ token })
    } catch (error) {
      if (error instanceof ErrorHandling) {
        return response.status(error.status).end()
      }

      throw error
    }
  }
}
