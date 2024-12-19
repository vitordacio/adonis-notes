import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(5).maxLength(254),
    password: vine.string().trim().minLength(6),
    full_name: vine.string().trim().escape().nullable(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().minLength(5).maxLength(254).nullable(),
    password: vine.string().trim().minLength(6).nullable(),
    full_name: vine.string().trim().escape().nullable(),
  })
)

export const findByIdUserValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)
