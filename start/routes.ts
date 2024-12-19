import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.resource('/users', UsersController).apiOnly()
})
