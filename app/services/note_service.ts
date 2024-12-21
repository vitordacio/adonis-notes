import AppException from '#exceptions/app_exception'
import Note from '#models/note'
import { createNoteValidator, paramIdNoteValidator, updateNoteValidator } from '#validators/note'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { NoteRepository } from '../repositories/notes/implementation/NoteRepository.js'
import UnAuthorizedException from '#exceptions/un_authorized_exception'

@inject()
export class NoteService {
  constructor(
    private ctx: HttpContext,
    private noteRepository: NoteRepository
  ) {}

  create = async (): Promise<Note> => {
    const payload = await this.ctx.request.validateUsing(createNoteValidator)
    const { user } = this.ctx.auth
    const { title, description } = payload

    const note = await this.noteRepository.create({ user_id: Number(user!.id), title, description })

    return note
  }

  findById = async (): Promise<Note> => {
    const payload = await this.ctx.request.validateUsing(paramIdNoteValidator)
    const { params } = payload
    const note = await this.noteRepository.findById(params.id)

    if (!note) {
      throw new AppException('Note not found', {
        status: 404,
      })
    }

    return note
  }

  findByUser = async (): Promise<Note[]> => {
    const { user } = this.ctx.auth

    const notes = await this.noteRepository.findByUser(user!.id)

    return notes
  }

  update = async (): Promise<Note> => {
    const payload = await this.ctx.request.validateUsing(updateNoteValidator)
    const { note_id, title, description } = payload
    const { user } = this.ctx.auth

    const note = await this.noteRepository.findById(note_id)

    if (!note) {
      throw new AppException('Note not found', { status: 404 })
    }

    if (note.userId !== Number(user!.id)) {
      throw new UnAuthorizedException()
    }

    if (title) note.title = title
    if (description) note.description = description

    await this.noteRepository.save(note)

    return note
  }

  delete = async (): Promise<void> => {
    const payload = await this.ctx.request.validateUsing(paramIdNoteValidator)
    const { params } = payload
    const { user } = this.ctx.auth

    const note = await this.noteRepository.findById(params.id)

    if (!note) {
      throw new AppException('Note not found', { status: 404 })
    }

    if (note.userId !== Number(user!.id)) {
      throw new UnAuthorizedException()
    }

    await this.noteRepository.delete(note)
  }
}
