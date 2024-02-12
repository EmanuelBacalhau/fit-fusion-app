import { Router } from 'express'
import { RegisterExerciseController } from './register-exercise-controller'
import { multerConfig } from '@src/middlewares/multer-config'
import { isAuthenticated } from '@src/middlewares/is-authenticated'

export const exerciseRoutes = Router()

exerciseRoutes.post(
  '/exercises',
  isAuthenticated,
  multerConfig.exercise.fields([
    { name: 'cover', maxCount: 1 },
    { name: 'gif', maxCount: 1 },
  ]),
  new RegisterExerciseController().handle,
)
