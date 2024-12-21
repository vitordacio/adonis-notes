import Note from '#models/note'
import { INoteRepository } from '../INoteRepository.js'
import { ICreateNoteDTO } from '../INoteRepositoryDTO.js'

class NoteRepository implements INoteRepository {
  async create({ user_id, title, description }: ICreateNoteDTO): Promise<Note> {
    const note = await Note.create({
      userId: user_id,
      title,
      description,
    })

    return note
  }

  async save(note: Note): Promise<Note> {
    const newNote = await note.save()

    return newNote
  }

  async findById(id: number): Promise<Note | null> {
    const note = await Note.query().where('id', id).preload('user').first()

    return note
  }

  async findByUser(user_id: string): Promise<Note[]> {
    const notes = await Note.query().where('user_id', user_id).orderBy('created_at', 'desc')

    return notes
  }

  async delete(note: Note): Promise<void> {
    await note.delete()
  }
}

export { NoteRepository }
