import { sha256 as _sha256 } from 'crypto-hash'
import { sort } from 'fast-sort'
import { isArray, isObject, isSymbol } from 'is-what'

export function sortObject<T extends { [key in string]: unknown }>(
  obj: T,
  options?: { deep?: boolean },
): T {
  const { deep = false } = options || {}
  let entries = Object.entries(obj)
  if (deep) {
    entries = entries.map((entry) =>
      isObject(entry[1])
        ? [entry[0], sortObject(entry[1], options)]
        : isArray(entry[1])
          ? [entry[0], sortArray(entry[1], options)]
          : entry,
    )
  }
  return Object.fromEntries(sort(entries).asc(([key]) => key)) as any
}

export function sortArray<T extends any[]>(array: T, options?: { deep?: boolean }): T {
  const { deep = false } = options || {}
  if (deep) {
    array = array.map((val) =>
      isObject(val) ? sortObject(val, options) : isArray(val) ? sortArray(val, options) : val,
    ) as any
  }
  return sort(array).asc() as any
}

export async function sha256(
  payload: any,
  options?: { sort?: boolean; deepSort?: boolean },
): Promise<string> {
  const { sort = false, deepSort = false } = options || {}

  if (isSymbol(payload)) throw new Error('Cannot sha256 a symbol')

  if (isObject(payload)) {
    return _sha256(
      JSON.stringify(sort || deepSort ? sortObject(payload, { deep: deepSort }) : payload),
    )
  }

  if (isArray(payload)) {
    return _sha256(
      JSON.stringify(sort || deepSort ? sortArray(payload, { deep: deepSort }) : payload),
    )
  }

  return _sha256(`${payload}`)
}
