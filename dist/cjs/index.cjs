'use strict';

const cryptoHash = require('crypto-hash');
const isWhat = require('is-what');
const fastSort = require('fast-sort');

function sortObject(obj, options) {
  const { deep = false } = options || {};
  let entries = Object.entries(obj);
  if (deep) {
    entries = entries.map(
      (entry) => isWhat.isObject(entry[1]) ? [entry[0], sortObject(entry[1], options)] : isWhat.isArray(entry[1]) ? [entry[0], sortArray(entry[1], options)] : entry
    );
  }
  return Object.fromEntries(fastSort.sort(entries).asc(([key]) => key));
}
function sortArray(array, options) {
  const { deep = false } = options || {};
  if (deep) {
    array = array.map(
      (val) => isWhat.isObject(val) ? sortObject(val, options) : isWhat.isArray(val) ? sortArray(val, options) : val
    );
  }
  return fastSort.sort(array).asc();
}
async function sha256(payload, options) {
  const { sort: sort2 = false, deepSort = false } = options || {};
  if (isWhat.isSymbol(payload))
    throw new Error("Cannot sha256 a symbol");
  if (isWhat.isObject(payload)) {
    return cryptoHash.sha256(
      JSON.stringify(sort2 || deepSort ? sortObject(payload, { deep: deepSort }) : payload)
    );
  }
  if (isWhat.isArray(payload)) {
    return cryptoHash.sha256(
      JSON.stringify(sort2 || deepSort ? sortArray(payload, { deep: deepSort }) : payload)
    );
  }
  return cryptoHash.sha256(`${payload}`);
}

exports.sha256 = sha256;
exports.sortArray = sortArray;
exports.sortObject = sortObject;
