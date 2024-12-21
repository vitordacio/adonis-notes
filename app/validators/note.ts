import vine from '@vinejs/vine'

export const createNoteValidator = vine.compile(
  vine.object({
    title: vine.string().trim().escape().minLength(5).maxLength(254),
    description: vine.string().trim().escape(),
  })
)

export const updateNoteValidator = vine.compile(
  vine.object({
    note_id: vine.number(),
    title: vine.string().trim().escape().minLength(5).maxLength(254).nullable(),
    description: vine.string().trim().escape().nullable(),
  })
)

export const paramIdNoteValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)
