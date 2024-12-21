import NotesController from '#controllers/notes_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/', [NotesController, 'store']).as('notes.store')
    router.get('/', [NotesController, 'userIndex']).as('notes.userIndex')
    router.get('/:id', [NotesController, 'show']).as('notes.show')
    router.put('/', [NotesController, 'update']).as('notes.update')
    router.delete('/:id', [NotesController, 'destroy']).as('notes.destroy')
  })
  .use(middleware.auth())
  .prefix('notes')
