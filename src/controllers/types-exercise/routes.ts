import { checkUserRole } from '@src/middlewares/check-user-role'
import { isAuthenticated } from '@src/middlewares/is-authenticated'
import { Router } from 'express'
import { RegisterTypesExerciseController } from './register-type-exercise-controller'

export const typesExerciseRoutes = Router()

typesExerciseRoutes.post(
  '/types-exercise',
  isAuthenticated,
  checkUserRole,
  new RegisterTypesExerciseController().handle,
)
