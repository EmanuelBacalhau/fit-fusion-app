import { NextFunction, Request, Response } from 'express'

export function checkUserRole(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const role = request.user.role

  if (role !== 'ADMIN') {
    return response.status(401).end()
  }

  return next()
}
