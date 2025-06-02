import { before, test } from 'node:test'
import assert from 'node:assert'
import fs from 'fs'
import os from 'os'
import path from 'path'

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eventschedule-'))
process.env.DB_DIALECT = 'sqlite'
process.env.DB_FILE = path.join(tmpDir, 'migration.sqlite')

let ORM: typeof import('../src/data/ORM.js').default
let migrationService: typeof import('../src/services/migration.js')
let MigrationStep: typeof import('../src/models/Migration.js').MigrationStep

before(async () => {
  const ormMod = await import('../src/data/ORM.js')
  ORM = ormMod.default
  migrationService = await import('../src/services/migration.js')
  ;({ MigrationStep } = await import('../src/models/Migration.js'))
  await ORM.sync({ force: true })
})



test('mark and check migration', async () => {
  const step = MigrationStep.initial
  const beforeMark = await migrationService.isMigrationComplete(step)
  assert.equal(beforeMark, false)
  await migrationService.markMigrationComplete(step)
  const afterMark = await migrationService.isMigrationComplete(step)
  assert.equal(afterMark, true)
})
