import { before, test } from 'node:test'
import assert from 'node:assert'
import fs from 'fs'
import os from 'os'
import path from 'path'

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eventschedule-'))
process.env.DB_DIALECT = 'sqlite'
process.env.DB_FILE = path.join(tmpDir, 'test.sqlite')

let ORM: typeof import('../src/data/ORM.js').default
let userService: typeof import('../src/services/user.js')

before(async () => {
  const ormMod = await import('../src/data/ORM.js')
  ORM = ormMod.default
  userService = await import('../src/services/user.js')
  await ORM.sync({ force: true })
})



test('create and find user', async () => {
  const user = await userService.create('alice@example.com')
  assert.ok(user.id)
  assert.equal(user.email, 'alice@example.com')

  const found = await userService.findUserByOAuthId('no-such')
  assert.equal(found, null)
})

test('update user data', async () => {
  await userService.create('bob@example.com')
  const updated = await userService.updateUser(
    'bob@example.com',
    true,
    'Smith',
    'Bob',
    'google',
    '1234'
  )
  assert.ok(updated)
  assert.equal(updated?.familyName, 'Smith')

  const found = await userService.findUserByOAuthId('1234')
  assert.ok(found)
  assert.equal(found?.givenName, 'Bob')
})
