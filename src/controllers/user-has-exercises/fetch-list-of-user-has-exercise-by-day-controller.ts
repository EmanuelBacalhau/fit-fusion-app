import { makeFetchListOfUserHasExerciseByDayUseCase } from '@src/factories/user-has-exercises/make-fetch-list-of-user-has-exercises-by-day'
import { ResourceNotFoundError } from '@src/use-cases/errors/resource-not-found-error'
import { Request, Response } from 'express'
import { ZodError, z } from 'zod'

export class FetchListOfUserHasExercisesByDayController {
  async handle(request: Request, response: Response) {
    const fetchParamsSchema = z.object({
      dayId: z.string().cuid(),
    })

    const userId = request.user.id

    try {
      const { dayId } = fetchParamsSchema.parse(request.params)

      const fetchListOfUserHasExercisesUseCase =
        makeFetchListOfUserHasExerciseByDayUseCase()

      const { exercises } = await fetchListOfUserHasExercisesUseCase.execute({
        userId,
        dayId,
      })

      return response.status(200).json({
        exercises,
      })
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
