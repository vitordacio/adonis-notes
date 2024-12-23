import User from '#models/user'

export const createTestUser = async (): Promise<User> => {
  const user = new User()
  user.username = 'test_user'
  user.password = 'secret'
  user.full_name = ''

  await user.save()

  return user
}

export const deleteTestUser = async (): Promise<void> => {
  const user = await User.findBy('username', 'test_user')
  if (user) await user.delete()
}
