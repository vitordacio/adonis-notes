import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/', [AuthController, 'signIn']).as('auth.signIn')
  })
  .prefix('auth')
