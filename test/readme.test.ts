import { expect, test } from 'vitest'
import { sha256 } from '../src/index.js'

test('unsorted', async () => {
  expect(
    await sha256({
      '001': { name: 'Bulbasaur', level: 10 },
      '004': { name: 'Charmander', level: 8 },
      '007': { name: 'Squirtle', level: 11 },
    }),
  ).toEqual('73e62b59429905357023c7afba82ea95dceffd6e4a0761519efdc389d0e51f0f')

  expect(
    await sha256({
      '007': { name: 'Squirtle', level: 11 },
      '004': { name: 'Charmander', level: 8 },
      '001': { name: 'Bulbasaur', level: 10 },
    }),
  ).toEqual('dcfa92cebc60af31015f058cb33a9ebe6b68d6e6fee066cb67a902b03dda5f0e')
})

test('sorted - shallow', async () => {
  expect(
    await sha256(
      {
        '001': { name: 'Bulbasaur', level: 10 },
        '004': { name: 'Charmander', level: 8 },
        '007': { name: 'Squirtle', level: 11 },
      },
      { sort: true },
    ),
  ).toEqual('73e62b59429905357023c7afba82ea95dceffd6e4a0761519efdc389d0e51f0f')

  expect(
    await sha256(
      {
        '007': { name: 'Squirtle', level: 11 },
        '004': { name: 'Charmander', level: 8 },
        '001': { name: 'Bulbasaur', level: 10 },
      },
      { sort: true },
    ),
  ).toEqual('73e62b59429905357023c7afba82ea95dceffd6e4a0761519efdc389d0e51f0f')
})

test('sorted - deep', async () => {
  expect(
    await sha256(
      {
        '001': { name: 'Bulbasaur', level: 10 },
        '004': { name: 'Charmander', level: 8 },
        '007': { name: 'Squirtle', level: 11 },
      },
      { deepSort: true },
    ),
  ).toEqual('64205611ef6f0d7ec4ebab1e3c0f84f1e4cb160af949cff3b32c0bdb0dbe7cb3')

  expect(
    await sha256(
      {
        '007': { name: 'Squirtle', level: 11 },
        '004': { name: 'Charmander', level: 8 },
        '001': { name: 'Bulbasaur', level: 10 },
      },
      { deepSort: true },
    ),
  ).toEqual('64205611ef6f0d7ec4ebab1e3c0f84f1e4cb160af949cff3b32c0bdb0dbe7cb3')
})
