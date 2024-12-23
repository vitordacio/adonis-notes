import { test } from '@japa/runner'
import User from '#models/user'
import { createTestUser, deleteTestUser } from './utils.js'

test.group('Users list', (group) => {
  let user: User

  group.setup(async () => {
    await deleteTestUser()
    user = await createTestUser()
  })

  group.teardown(async () => {
    await deleteTestUser()
  })

  test('get a list of users', async ({ client, assert }) => {
    const response = await client.get('/users').loginAs(user)

    response.assertStatus(200)

    const users = response.body()

    assert.isArray(users, 'The response should be an array of users')

    assert.isTrue(users.length > 0, 'The response should contain at least one user')

    for (const user of users) {
      assert.properties(
        user,
        ['id', 'username', 'fullName', 'createdAt', 'updatedAt'],
        'Each user should have the required keys'
      )
      assert.isNumber(user.id, 'The user id should be a number')
      assert.isString(user.username, 'The username should be a string')
      assert.isString(user.createdAt, 'The createdAt should be a string')
      assert.isString(user.updatedAt, 'The updatedAt should be a string')

      assert.match(
        user.createdAt,
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\+\d{2}:\d{2}$/,
        'The createdAt should be in ISO format'
      )
      assert.match(
        user.updatedAt,
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\+\d{2}:\d{2}$/,
        'The updatedAt should be in ISO format'
      )

      if (user.fullName !== null) {
        assert.isString(user.fullName, 'The fullName should be a string when it is not null')
      }
    }

    const testUser = users.find((u: User) => u.username === 'test_user')
    assert.exists(testUser, 'The test_user should exist in the list')

    assert.equal(testUser?.username, 'test_user', 'The username of test_user should match')
    assert.isEmpty(testUser?.fullName, 'The fullName of test_user should be empty')
  })
})
