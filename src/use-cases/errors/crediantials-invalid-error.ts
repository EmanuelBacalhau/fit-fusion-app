import { ErrorHandling } from './error-handling'

export class InvalidCrediantialsError extends ErrorHandling {
  constructor() {
    super('Invalid credentials ', 400)
  }
}
