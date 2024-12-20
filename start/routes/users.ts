import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/', [UsersController, 'store']).as('users.store')
    router.get('/', [UsersController, 'index']).as('users.index')
    router.get('/:id', [UsersController, 'show']).as('users.show')
    router.put('/', [UsersController, 'update']).use(middleware.auth()).as('users.update')
    router.delete('/', [UsersController, 'destroy']).use(middleware.auth()).as('users.destroy')
  })
  .prefix('users')
