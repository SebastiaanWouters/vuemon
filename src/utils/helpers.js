export const uniqBy = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];
  
  return [...arr.reduce((map, item) => {
    const key = (item === null || item === undefined) ? 
      item : cb(item);
    
    map.has(key) || map.set(key, item);
    
    return map;
  }, new Map()).values()];
};

export function addAndSort(arr, val, propertyName) {
  arr.push(val);
  let i = arr.length - 1;
  let item = arr[i];
  while (i > 0 && item[propertyName] < arr[i-1][propertyName]) {
      arr[i] = arr[i-1];
      i -= 1;
  }
  arr[i] = item;
  return arr;
}