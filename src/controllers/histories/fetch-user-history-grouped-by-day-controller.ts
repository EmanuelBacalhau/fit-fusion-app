import { makeFetchUserHistoryGroupedByDayUseCase } from '@src/factories/histories/make-fetch-user-history-grouped-by-day-use-case'
import { ResourceNotFoundError } from '@src/use-cases/errors/resource-not-found-error'
import { Request, Response } from 'express'

export class FetchUserHistoryGroupedByDayController {
  async handle(request: Request, response: Response) {
    try {
      const fetchUserHistoryGroupedByDayUseCase =
        makeFetchUserHistoryGroupedByDayUseCase()

      const { history } = await fetchUserHistoryGroupedByDayUseCase.execute({
        userId: request.user.id,
      })

      return response.status(200).json({ history })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(error.status).json({
          message: error.message,
        })
      }

      throw error
    }
  }
}
