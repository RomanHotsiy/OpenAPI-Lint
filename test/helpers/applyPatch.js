'use strict';
import {isArray} from 'lodash';

/*
 * Enhanced version of apply function from https://github.com/pierreinglebert/json-merge-patch
 * Adds support of modifying array items
 * Example:
 * var obj = {
 *   a: [1, 2, {test: 3}]
 * }
 * var patch = {
 *   [a]: {  // [] enable array-mode
 *     0: 3, //change first element to 3
 *     1: null, // remove second element
 *     2: {test: "hello"} // apply patch to second element
 *     $: "end" // add element to the end of array
 *     $: "can add multiple times"
 *   }
 * }
 * apply(obj, patch)
 * // { a: [3, {test: "hello"}, "end", "can add multiple times"] }
*/

export default function apply(target, patch, isTargetArray) {
  if (patch === null || typeof patch !== 'object' || isArray(patch)) {
    return patch;
  }
  if (target === null || typeof target !== 'object') {
    target = isTargetArray ? [] : {};
  }

  var keys = Object.keys(patch);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var targetKey;
    var arrayKey = false;
    if (key.charAt(0) == '[' && key.charAt(key.length - 1) == ']') {
      targetKey = key.substr(1, key.length - 2);
      arrayKey = true;
    } else {
      targetKey = unEscapeKey(key);
    }
    if (isTargetArray) {
      if (key === '$') {
        targetKey = target.length;
      } else if (!isNumeric(key)) {
        throw Error('Can not apply non-numeric key on array target')
      }
    }
    if (patch[key] === null) {
      if (target.hasOwnProperty(targetKey)) {
        delete target[targetKey];
      }
    } else {
      target[targetKey] = apply(target[targetKey], patch[key], arrayKey);
    }
  }
  if (isTargetArray) {
    target = target.filter(n => n != undefined);
  }
  return target;
};

function isNumeric(n) {
  return !isNaN(parseInt(n, 10)) && isFinite(n);
}

function unEscapeKey(key) {
  if (key.substr(0,2) === '\\[') {
    return '[' + key.substr(2);
  }
  return key;
}
