export abstract class ErrorHandling {
  constructor(
    public message: string,
    public status = 400,
  ) {}
}
