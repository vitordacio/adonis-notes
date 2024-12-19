import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class AppException extends Exception {
  static status = 400
  static message = 'Bad Request'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      status: error.status,
      message: error.message,
    })
  }
}
