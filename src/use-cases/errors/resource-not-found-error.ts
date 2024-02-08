import { ErrorHandling } from './error-handling'

export class ResourceNotFoundError extends ErrorHandling {
  constructor() {
    super('Resource not found', 409)
  }
}
