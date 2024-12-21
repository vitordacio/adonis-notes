import app from '@adonisjs/core/services/app'
import { errors as validationErrors } from '@vinejs/vine'
import { errors } from '@adonisjs/core'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import AppException from './app_exception.js'
import UnAuthorizedException from './un_authorized_exception.js'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: any, ctx: HttpContext) {
    if (error instanceof validationErrors.E_VALIDATION_ERROR) {
      throw new AppException(error.messages, {
        status: 422,
      })
    }

    if (
      Object.values(errors).some((ErrorClass) => {
        return error instanceof ErrorClass
      })
    ) {
      throw new AppException((error as any).message || 'An unexpected error occurred', {
        status: (error as any).status || 500,
      })
    }

    if (error.code === 'E_UNAUTHORIZED_ACCESS') {
      throw new UnAuthorizedException('Unauthorized access', { status: 401 })
    }

    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
