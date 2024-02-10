import { env } from '@src/env'
import { sign } from 'jsonwebtoken'
import { Request, Response } from 'express'

export class RefreshTokenUserController {
  async handle(request: Request, response: Response) {
    const user = request.user

    const token = sign({ role: user.role }, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1h',
    })

    const refreshToken = sign({ role: user.role }, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    })

    return response
      .cookie('refresh-token', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .json({ token })
  }
}
