import { Router } from 'express'
import { RegisterDayController } from './register-day-controller'
import { isAuthenticated } from '@src/middlewares/is-authenticated'
import { checkUserRole } from '@src/middlewares/check-user-role'
import { FetchListOfDayController } from './fetch-list-of-day-controller'

export const dayRoutes = Router()

dayRoutes.post(
  '/days',
  isAuthenticated,
  checkUserRole,
  new RegisterDayController().handle,
)

dayRoutes.get('/days', isAuthenticated, new FetchListOfDayController().handle)
