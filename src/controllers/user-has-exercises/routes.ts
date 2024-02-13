import { checkUserRole } from '@src/middlewares/check-user-role'
import { isAuthenticated } from '@src/middlewares/is-authenticated'
import { Router } from 'express'
import { RegisterUserHasExerciseController } from './register-user-has-exercise-controller'

export const userHasExerciseRoutes = Router()

userHasExerciseRoutes.post(
  '/userHasExercises',
  isAuthenticated,
  checkUserRole,
  new RegisterUserHasExerciseController().handle,
)
