# Sha anything 🔑

<a href="https://www.npmjs.com/package/sha-anything"><img src="https://img.shields.io/npm/v/sha-anything.svg" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/sha-anything"><img src="https://img.shields.io/npm/dw/sha-anything.svg" alt="Latest Stable Version"></a>

```
npm i sha-anything
```

Uses [crypto-hash](https://github.com/sindresorhus/crypto-hash) but adds support to hash anything, including objects, arrays, etc. with good TypeScript support. A small and simple integration.

## Motivation

I often want to create a hash from an object like so:

```js
sha256(someObject)
```

But you need to do a lot of extra work to make it work for objects.

`sha-anything` is a simple and small function that converts objects, arrays, etc. into hashable strings, and then pipes them through `crypto-hash`.

## Usage

```js
import { sha256 } from 'sha-anything'

await sha256({
  '001': { name: 'Bulbasaur', level: 10 },
  '004': { name: 'Charmander', level: 8 },
  '007': { name: 'Squirtle', level: 11 },
})
// '73e62b59429905357023c7afba82ea95dceffd6e4a0761519efdc389d0e51f0f'
```

Please note that a different object order, gives a different hash:

```js
import { sha256 } from 'sha-anything'

await sha256({
  '007': { name: 'Squirtle', level: 11 },
  '004': { name: 'Charmander', level: 8 },
  '001': { name: 'Bulbasaur', level: 10 },
})
// 'dcfa92cebc60af31015f058cb33a9ebe6b68d6e6fee066cb67a902b03dda5f0e'
```

### Sort object keys

You can make sure you get the same hash by sorting your object keys. This feature is **built in**:

```js
import { sha256 } from 'sha-anything'

await sha256({
  '007': { name: 'Squirtle', level: 11 },
  '004': { name: 'Charmander', level: 8 },
  '001': { name: 'Bulbasaur', level: 10 },
}, { sort: true })
// '73e62b59429905357023c7afba82ea95dceffd6e4a0761519efdc389d0e51f0f'
```

### Deep sort object keys

Setting `deepSort: true` will sort any object or array deeply.

```js
import { sha256 } from 'sha-anything'

await sha256({
  '001': { name: 'Bulbasaur', level: 10 },
  '004': { name: 'Charmander', level: 8 },
  '007': { name: 'Squirtle', level: 11 },
}, { deepSort: true })
// '64205611ef6f0d7ec4ebab1e3c0f84f1e4cb160af949cff3b32c0bdb0dbe7cb3'
await sha256({
  '007': { name: 'Squirtle', level: 11 },
  '004': { level: 8, name: 'Charmander' },
  '001': { name: 'Bulbasaur', level: 10 },
}, { deepSort: true })
// '64205611ef6f0d7ec4ebab1e3c0f84f1e4cb160af949cff3b32c0bdb0dbe7cb3'
```

## Meet the family

- [copy-anything 🎭](https://github.com/mesqueeb/copy-anything)
- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [map-anything 🗺](https://github.com/mesqueeb/map-anything)
- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [find-and-replace-anything 🎣](https://github.com/mesqueeb/find-and-replace-anything)
- [compare-anything 🛰](https://github.com/mesqueeb/compare-anything)
- [flatten-anything 🏏](https://github.com/mesqueeb/flatten-anything)
- [is-what 🙉](https://github.com/mesqueeb/is-what)
