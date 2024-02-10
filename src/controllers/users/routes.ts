import { Router } from 'express'
import { multerConfig } from '@src/middlewares/multer-config'
import { RegisterUserController } from './register-user-controller'
import { AuthenticateUserController } from './authenticate-user-controller'

export const userRoutes = Router()

userRoutes.post(
  '/users',
  multerConfig.user.single('avatar'),
  new RegisterUserController().handle,
)

userRoutes.post('/sessions', new AuthenticateUserController().handle)
