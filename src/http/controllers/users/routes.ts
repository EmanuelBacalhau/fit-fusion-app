import { Router } from 'express'
import { multerConfig } from '@middlewares/multer-config'
import { RegisterUserController } from './register-user-controller'

export const userRoutes = Router()

userRoutes.post(
  '/users',
  multerConfig.user.single('avatar'),
  new RegisterUserController().handle,
)
