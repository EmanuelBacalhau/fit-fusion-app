export abstract class ErrorHandling {
  constructor(
    private message: string,
    private status = 400,
  ) {}
}
