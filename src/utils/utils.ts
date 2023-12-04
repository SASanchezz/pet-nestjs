export function removeKey(obj: object, exceptionKey: string): any {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        removeKey(obj[key], exceptionKey);
      } else {
        if (key === exceptionKey) {
          delete obj[key];
        }
      }
    }
  }
  return obj;
}
