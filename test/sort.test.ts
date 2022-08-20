import { sortArray, sortObject } from '../src/index'
import { test, expect } from 'vitest'

test('object sort - flat', async () => {
  expect(sortObject({ b: 2, a: 1 })).toEqual({ a: 1, b: 2 })
})

test('array sort - flat', async () => {
  expect(sortArray([5, 7, 4, 2, 3, 1])).toEqual([1, 2, 3, 4, 5, 7])
})

test('object sort - deep', async () => {
  expect(sortObject({ b: { y: 1, x: 1 }, a: { y: 1, x: 1 } }, { deep: true })).toEqual({
    a: { x: 1, y: 1 },
    b: { x: 1, y: 1 },
  })
})

test('object ordered & unordered - deep + arrays', async () => {
  expect(
    sortObject({ b: { y: [2, 3, 4, 1], x: 1 }, a: { y: [3, 4, 1, 2], x: 1 } }, { deep: true })
  ).toEqual({ a: { x: 1, y: [1, 2, 3, 4] }, b: { x: 1, y: [1, 2, 3, 4] } })
})
