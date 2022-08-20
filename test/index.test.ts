import { sha256 } from '../src/index'
import { test, expect } from 'vitest'

test('sha256', async () => {
  expect(await sha256('123')).toEqual(
    'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
  )
})

test('sha256 - object ordered & unordered - flat', async () => {
  expect(await sha256({ a: 1, b: 2 })).toEqual(
    '43258cff783fe7036d8a43033f830adfc60ec037382473548ac742b888292777'
  )
  expect(await sha256({ b: 2, a: 1 }, { sort: true })).toEqual(
    '43258cff783fe7036d8a43033f830adfc60ec037382473548ac742b888292777'
  )
})

test('sha256 - array ordered & unordered - flat', async () => {
  expect(await sha256([1, 2, 3], { sort: true })).toEqual(
    'a615eeaee21de5179de080de8c3052c8da901138406ba71c38c032845f7d54f4'
  )
  expect(await sha256([2, 3, 1], { sort: true })).toEqual(
    'a615eeaee21de5179de080de8c3052c8da901138406ba71c38c032845f7d54f4'
  )
})

test('sha256 - object ordered & unordered - deep', async () => {
  expect(await sha256({ a: { x: 1, y: 1 }, b: { x: 1, y: 1 } })).toEqual(
    '777d21d7d2653a09cd04f5f9c19e2f4a733aec4ec5483ce017e33afdd89cc22e'
  )
  expect(await sha256({ b: { y: 1, x: 1 }, a: { y: 1, x: 1 } }, { deepSort: true })).toEqual(
    '777d21d7d2653a09cd04f5f9c19e2f4a733aec4ec5483ce017e33afdd89cc22e'
  )
})

test('sha256 - object ordered & unordered - deep + arrays', async () => {
  expect(await sha256({ a: { x: 1, y: [1, 2, 3, 4] }, b: { x: 1, y: [1, 2, 3, 4] } })).toEqual(
    'a1c9730464b58e0f932de066136a5a7df8a26b93f24ae74239d71755157dffe0'
  )
  expect(
    await sha256({ b: { y: [2, 3, 4, 1], x: 1 }, a: { y: [3, 4, 1, 2], x: 1 } }, { deepSort: true })
  ).toEqual('a1c9730464b58e0f932de066136a5a7df8a26b93f24ae74239d71755157dffe0')
})
