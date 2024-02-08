import { ErrorHandling } from './error-handling'

export class FieldInUseError extends ErrorHandling {
  constructor() {
    super('Field in use', 409)
  }
}
