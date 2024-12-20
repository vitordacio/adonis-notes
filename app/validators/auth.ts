import vine from '@vinejs/vine'

export const signInValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    password: vine.string().trim(),
  })
)
