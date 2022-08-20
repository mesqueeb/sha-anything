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

### Other types

```js
await sha256('123') // 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
await sha256(123) // 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
await sha256(true) // 'b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b'
await sha256('true') // 'b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b'
await sha256(false) // 'fcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa'
await sha256('false') // 'fcbcf165908dd18a9e49f7ff27810176db8e9f63b4352213741664245224f8aa'
await sha256(undefined) // 'eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950c'
await sha256('undefined') // 'eb045d78d273107348b0300c01d29b7552d622abbc6faf81b3ec55359aa9950c'
await sha256(null) // '74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b'
await sha256('null') // '74234e98afe7498fb5daf1f36ac2d78acc339464f950703b8c019892f982b90b'
await sha256(/\d/) // '841434ef0453514a69ca5c38926236f72f1496d64c7475feca3dd2e350f2fac6'
await sha256('/\\d/') // '841434ef0453514a69ca5c38926236f72f1496d64c7475feca3dd2e350f2fac6'
await sha256(/\D/) // 'a942b440234e1b6a646a583960bd8cbd15012f3acee2d5083552c7514a67de1e'
await sha256('/\\D/') // 'a942b440234e1b6a646a583960bd8cbd15012f3acee2d5083552c7514a67de1e'
```

The only thing you can't hash through sha256 is a symbol...

```js
await sha256(Symbol('123')) // throws an error
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
