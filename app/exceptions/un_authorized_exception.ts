import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class UnAuthorizedException extends Exception {
  static status = 403
  static message = 'You are not authorized'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      status: error.status,
      message: error.message,
    })
  }
}
