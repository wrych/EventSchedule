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
let eventService: typeof import('../src/services/event.js')
let RichTextSnapshot: typeof import('../src/models/RichText.js').RichTextSnapshot

before(async () => {
  const ormMod = await import('../src/data/ORM.js')
  ORM = ormMod.default
  userService = await import('../src/services/user.js')
  eventService = await import('../src/services/event.js')
  ;({ RichTextSnapshot } = await import('../src/models/RichText.js'))
  await ORM.sync({ force: true })
})



test('create event with snapshot', async () => {
  const user = await userService.create('eve@example.com')
  const start = new Date('2020-01-01T10:00:00Z')
  const end = new Date('2020-01-01T11:00:00Z')
  const event = await eventService.createEvent(
    user.id!,
    'test event',
    start,
    end,
    { text: 'desc' }
  )

  assert.ok(event.id)
  assert.ok(event.descriptionId)

  const snapshot = await RichTextSnapshot.findByPk(event.descriptionId)
  assert.ok(snapshot)
  assert.deepEqual(snapshot?.docJson, { text: 'desc' })
})

test('getAllEvents sorts by start time', async () => {
  const user = await userService.create('sort@example.com')
  await eventService.createEvent(
    user.id!,
    'second',
    new Date('2020-01-02T10:00:00Z'),
    new Date('2020-01-02T11:00:00Z'),
    {}
  )
  await eventService.createEvent(
    user.id!,
    'first',
    new Date('2020-01-01T10:00:00Z'),
    new Date('2020-01-01T11:00:00Z'),
    {}
  )

  const events = await eventService.getAllEvents()
  const relevant = events.filter((e) =>
    ['first', 'second'].includes(e.eventName)
  )
  assert.equal(relevant.length, 2)
  assert.ok(relevant[0].startDatetime < relevant[1].startDatetime)
})

test('update description stores new snapshot', async () => {
  const user = await userService.create('update@example.com')
  const event = await eventService.createEvent(
    user.id!,
    'desc event',
    new Date('2020-01-01T10:00:00Z'),
    new Date('2020-01-01T11:00:00Z'),
    { html: '<p>v1</p>' }
  )

  const snap2 = await eventService.updateDescription(
    event.id!,
    { html: '<p>v2</p>' },
    user.id!
  )

  assert.ok(snap2)
  const updatedEvent = await eventService.getEvent(event.id!)
  assert.equal(snap2?.version, 2)
  assert.deepEqual(updatedEvent?.description, { html: '<p>v2</p>' })
})
