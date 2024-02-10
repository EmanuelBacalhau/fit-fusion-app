import { ErrorHandling } from '@src/errors/error-handling'

export class InvalidCrediantialsError extends ErrorHandling {
  constructor() {
    super('Invalid credentials ', 401)
  }
}
