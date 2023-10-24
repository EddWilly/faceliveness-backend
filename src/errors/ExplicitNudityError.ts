export class ExplicitNudityError extends Error {
  code = 400
  message: string

  constructor(message: string) {
    super()
    this.message = message
  }
}
