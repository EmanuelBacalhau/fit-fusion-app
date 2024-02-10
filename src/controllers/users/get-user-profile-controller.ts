import { Request, Response } from 'express'
import { makeGetUserProfileUseCase } from '@src/factories/users/make-get-user-profile-user-use-case'
import { ResourceNotFoundError } from '@src/use-cases/errors/resource-not-found-error'

export class GetUserProfileController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id

    try {
      const authenticateUserUseCase = makeGetUserProfileUseCase()

      const { user } = await authenticateUserUseCase.execute({ userId })

      return response.status(200).json({ user })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(error.status).end()
      }

      throw error
    }
  }
}
