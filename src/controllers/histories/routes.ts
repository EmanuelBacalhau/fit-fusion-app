import { isAuthenticated } from '@src/middlewares/is-authenticated'
import { Router } from 'express'
import { RegisterHistoryController } from './register-history-controller'

export const historyRoutes = Router()

historyRoutes.post(
  '/histories',
  isAuthenticated,
  new RegisterHistoryController().handle,
)
