import { test } from '@japa/runner'

import hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import { deleteTestUser } from './utils.js'

test.group('creating user', (group) => {
  // group.each.setup(async () => {
  //   console.log('runs before every test')
  // })

  // group.each.teardown(async () => {
  //   console.log('runs after every test')
  // })

  group.setup(async () => {
    await deleteTestUser()
  })

  group.teardown(async () => {
    await deleteTestUser()
  })

  test('should create a new user', async ({ assert }) => {
    const user = new User()
    user.username = 'test_user'
    user.password = 'secret'
    user.full_name = ''

    await user.save()

    assert.equal(user.username, 'test_user')

    assert.exists(user.id, 'User ID does not exist')

    assert.isNumber(user.id, 'User ID is not a number')

    assert.exists(user.full_name, 'User full name does not exist')

    assert.isEmpty(user.full_name, 'User full name is not empty')

    assert.isTrue(hash.isValidHash(user.password), 'Password is not hashed')

    assert.isTrue(await hash.verify(user.password, 'secret'), 'Password hash verification failed')

    const savedUser = await User.find(user.id)
    assert.isNotNull(savedUser, 'User was not saved in the database')
    assert.equal(savedUser?.username, 'test_user', 'Saved username does not match')
  })
})
