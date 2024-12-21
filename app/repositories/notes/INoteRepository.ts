import Note from '#models/note'
import { ICreateNoteDTO } from './INoteRepositoryDTO.js'

export interface INoteRepository {
  create(data: ICreateNoteDTO): Promise<Note>
  save(note: Note): Promise<Note>
  findById(id: number): Promise<Note | null>
  findByUser(user_id: string): Promise<Note[]>
  delete(note: Note): Promise<void>
}
