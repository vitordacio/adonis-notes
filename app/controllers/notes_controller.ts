import { NoteService } from '#services/note_service'
import { inject } from '@adonisjs/core'

@inject()
export default class NotesController {
  constructor(private noteService: NoteService) {}

  async userIndex() {
    const notes = await this.noteService.findByUser()

    return notes
  }

  async store() {
    const note = await this.noteService.create()

    return note
  }

  async show() {
    const note = await this.noteService.findById()

    return note
  }

  async update() {
    const note = await this.noteService.update()

    return note
  }

  async destroy() {
    await this.noteService.delete()
  }
}
