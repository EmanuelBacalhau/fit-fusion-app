import { isAuthenticated } from '@src/middlewares/is-authenticated'
import { Router } from 'express'
import { RegisterHistoryController } from './register-history-controller'
import { FetchUserHistoryGroupedByDayController } from './fetch-user-history-grouped-by-day-controller'

export const historyRoutes = Router()

historyRoutes.post(
  '/histories',
  isAuthenticated,
  new RegisterHistoryController().handle,
)

historyRoutes.get(
  '/histories',
  isAuthenticated,
  new FetchUserHistoryGroupedByDayController().handle,
)
