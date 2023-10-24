export class ImageNotFountError extends Error {
  code = 404
  type = 'IMAGE_NOT_FOUND_ERROR'
  message: string

  constructor(message: string) {
    super(message)
    this.message = message
  }
}
