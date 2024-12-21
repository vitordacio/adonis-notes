import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().escape().minLength(5).maxLength(56),
    password: vine.string().trim().escape().minLength(5),
    full_name: vine.string().trim().escape().minLength(5).maxLength(254).nullable(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim().escape().minLength(5).maxLength(56).nullable(),
    password: vine.string().trim().escape().minLength(5).nullable(),
    full_name: vine.string().trim().escape().minLength(5).maxLength(254).nullable().optional(),
  })
)

export const paramIdUserValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)
