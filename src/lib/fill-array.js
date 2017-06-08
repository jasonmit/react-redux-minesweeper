function fillArray(length, fn) {
  return Array.apply(null, new Array(length)).map(fn);
}

export default fillArray;
