import app from '@adonisjs/core/services/app'
import { errors as validationErrors } from '@vinejs/vine'
import { errors } from '@adonisjs/core'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    console.log(error)
    if (error instanceof errors.E_HTTP_EXCEPTION) {
      ctx.response.status(404).send({
        status: 404,
        message: error.message,
      })
      return
    }
    if (error instanceof errors.E_ROUTE_NOT_FOUND) {
      ctx.response.status(400).send({
        status: 400,
        message: error.message,
      })
      return
    }

    if (error instanceof validationErrors.E_VALIDATION_ERROR) {
      ctx.response.status(422).send({
        status: 422,
        message: error.messages,
      })
      return
    }

    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
