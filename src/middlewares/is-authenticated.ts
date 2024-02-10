import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import { env } from '@src/env'

interface Payload extends JwtPayload {
  role: string
}

export async function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!request.headers.authorization) {
    return response.status(401).end()
  }

  const [, token] = request.headers.authorization.split(' ')

  if (!token) {
    return response.status(401).end()
  }

  try {
    const { sub, role } = verify(token, env.JWT_SECRET) as Payload

    request.user = {
      id: sub,
      role,
    }

    return next()
  } catch (error) {
    return response.status(401).end()
  }
}
