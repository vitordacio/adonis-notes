import app from '@adonisjs/core/services/app'
import { errors as validationErrors } from '@vinejs/vine'
import { errors } from '@adonisjs/core'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof validationErrors.E_VALIDATION_ERROR) {
      ctx.response.status(422).send({
        status: 422,
        message: error.messages,
      })
      return
    }

    if (
      Object.values(errors).some((ErrorClass) => {
        return error instanceof ErrorClass
      })
    ) {
      ctx.response.status((error as any).status || 500).send({
        status: (error as any).status || 500,
        message: (error as any).message || 'An unexpected error occurred',
      })
      return
    }

    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
