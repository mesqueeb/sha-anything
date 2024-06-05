import { expect, test } from 'vitest'
import { sha256 } from '../src/index.js'

test('sha256 - string, number', async () => {
  expect(await sha256('123')).toEqual(
    'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
  )
  expect(await sha256(123)).toEqual(
    'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
  )
})

test('sha256 - boolean', async () => {
  expect(await sha256(true)).toEqual(
    'b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b',
  )
  expect(await sha256('true')).toEqual(
    'b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b',
  )
  expect(await sha256(false)).toEqual(
    'fcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa',
  )
  expect(await sha256('false')).toEqual(
    'fcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa',
  )
})

test('sha256 - undefined, null', async () => {
  expect(await sha256(undefined)).toEqual(
    'eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950c',
  )
  expect(await sha256('undefined')).toEqual(
    'eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950c',
  )
  expect(await sha256(null)).toEqual(
    '74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b',
  )
  expect(await sha256('null')).toEqual(
    '74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b',
  )
})

test('sha256 - symbol', async () => {
  const s = Symbol('123')
  expect(async () => {
    await sha256(s)
  }).rejects.toThrow('Cannot sha256 a symbol')
})

test('sha256 - regexp', async () => {
  expect(await sha256(/\d/)).toEqual(
    '841434ef0453514a69ca5c38926236f72f1496d64c7475feca3dd2e350f2fac6',
  )
  expect(await sha256('/\\d/')).toEqual(
    '841434ef0453514a69ca5c38926236f72f1496d64c7475feca3dd2e350f2fac6',
  )
  expect(await sha256(/\D/)).toEqual(
    'a942b440234e1b6a646a583960bd8cbd15012f3acee2d5083552c7514a67de1e',
  )
  expect(await sha256('/\\D/')).toEqual(
    'a942b440234e1b6a646a583960bd8cbd15012f3acee2d5083552c7514a67de1e',
  )
})

test('sha256 - object ordered & unordered - flat', async () => {
  expect(await sha256({ a: 1, b: 2 })).toEqual(
    '43258cff783fe7036d8a43033f830adfc60ec037382473548ac742b888292777',
  )
  expect(await sha256({ b: 2, a: 1 }, { sort: true })).toEqual(
    '43258cff783fe7036d8a43033f830adfc60ec037382473548ac742b888292777',
  )
})

test('sha256 - array ordered & unordered - flat', async () => {
  expect(await sha256([1, 2, 3], { sort: true })).toEqual(
    'a615eeaee21de5179de080de8c3052c8da901138406ba71c38c032845f7d54f4',
  )
  expect(await sha256([2, 3, 1], { sort: true })).toEqual(
    'a615eeaee21de5179de080de8c3052c8da901138406ba71c38c032845f7d54f4',
  )
})

test('sha256 - object ordered & unordered - deep', async () => {
  expect(await sha256({ a: { x: 1, y: 1 }, b: { x: 1, y: 1 } })).toEqual(
    '777d21d7d2653a09cd04f5f9c19e2f4a733aec4ec5483ce017e33afdd89cc22e',
  )
  expect(await sha256({ b: { y: 1, x: 1 }, a: { y: 1, x: 1 } }, { deepSort: true })).toEqual(
    '777d21d7d2653a09cd04f5f9c19e2f4a733aec4ec5483ce017e33afdd89cc22e',
  )
})

test('sha256 - object ordered & unordered - deep + arrays', async () => {
  expect(await sha256({ a: { x: 1, y: [1, 2, 3, 4] }, b: { x: 1, y: [1, 2, 3, 4] } })).toEqual(
    'a1c9730464b58e0f932de066136a5a7df8a26b93f24ae74239d71755157dffe0',
  )
  expect(
    await sha256(
      { b: { y: [2, 3, 4, 1], x: 1 }, a: { y: [3, 4, 1, 2], x: 1 } },
      { deepSort: true },
    ),
  ).toEqual('a1c9730464b58e0f932de066136a5a7df8a26b93f24ae74239d71755157dffe0')
})
