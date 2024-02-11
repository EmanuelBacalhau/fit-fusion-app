import { Router } from 'express'
import { RegisterDayController } from './register-day-controller'
import { isAuthenticated } from '@src/middlewares/is-authenticated'
import { checkUserRole } from '@src/middlewares/check-user-role'

export const dayRoutes = Router()

dayRoutes.post(
  '/days',
  isAuthenticated,
  checkUserRole,
  new RegisterDayController().handle,
)
