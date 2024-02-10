import { Request, Response } from 'express'
import { ErrorHandling } from '@src/errors/error-handling'
import { makeGetUserProfileUseCase } from '@src/factories/users/make-get-user-profile-user-use-case'

export class GetUserProfileController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id

    try {
      const authenticateUserUseCase = makeGetUserProfileUseCase()

      const userProfile = await authenticateUserUseCase.execute({ userId })

      return response.status(200).json({ user: userProfile })
    } catch (error) {
      if (error instanceof ErrorHandling) {
        return response.status(error.status).end()
      }

      throw error
    }
  }
}
