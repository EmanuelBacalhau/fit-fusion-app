import { makeFetchListOfDayUseCase } from '@src/factories/days/make-fetch-list-of-day-use-case'
import { Request, Response } from 'express'

export class FetchListOfDayController {
  async handle(request: Request, response: Response) {
    const fetchListOfDayUseCase = makeFetchListOfDayUseCase()

    const days = await fetchListOfDayUseCase.execute()

    return response.status(200).json({
      days,
    })
  }
}
