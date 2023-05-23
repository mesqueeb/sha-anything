import { sha256 as sha256$1 } from 'crypto-hash';
import { isObject, isArray, isSymbol } from 'is-what';
import { sort } from 'fast-sort';

function sortObject(obj, options) {
  const { deep = false } = options || {};
  let entries = Object.entries(obj);
  if (deep) {
    entries = entries.map(
      (entry) => isObject(entry[1]) ? [entry[0], sortObject(entry[1], options)] : isArray(entry[1]) ? [entry[0], sortArray(entry[1], options)] : entry
    );
  }
  return Object.fromEntries(sort(entries).asc(([key]) => key));
}
function sortArray(array, options) {
  const { deep = false } = options || {};
  if (deep) {
    array = array.map(
      (val) => isObject(val) ? sortObject(val, options) : isArray(val) ? sortArray(val, options) : val
    );
  }
  return sort(array).asc();
}
async function sha256(payload, options) {
  const { sort: sort2 = false, deepSort = false } = options || {};
  if (isSymbol(payload))
    throw new Error("Cannot sha256 a symbol");
  if (isObject(payload)) {
    return sha256$1(
      JSON.stringify(sort2 || deepSort ? sortObject(payload, { deep: deepSort }) : payload)
    );
  }
  if (isArray(payload)) {
    return sha256$1(
      JSON.stringify(sort2 || deepSort ? sortArray(payload, { deep: deepSort }) : payload)
    );
  }
  return sha256$1(`${payload}`);
}

export { sha256, sortArray, sortObject };
