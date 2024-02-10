import { Router } from 'express'
import { multerConfig } from '@src/middlewares/multer-config'
import { RegisterUserController } from './register-user-controller'
import { AuthenticateUserController } from './authenticate-user-controller'
import { RefreshTokenUserController } from './refresh-token-user-controller'
import { isAuthenticated } from '@src/middlewares/is-authenticated'

export const userRoutes = Router()

userRoutes.post(
  '/users',
  multerConfig.user.single('avatar'),
  new RegisterUserController().handle,
)

userRoutes.post('/sessions', new AuthenticateUserController().handle)
userRoutes.patch(
  '/token/refresh',
  isAuthenticated,
  new RefreshTokenUserController().handle,
)
