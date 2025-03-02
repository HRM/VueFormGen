export function withValAtPath(input: any, path: string[], value: any): any {
  if (path.length === 0) {
    return value;
  }
  const [head, ...tail] = path;
  const headAsNum = parseInt(head, 10);
  if (!isNaN(headAsNum)) {
    const newArray = Array.isArray(input) ? [...input] : [];
    if (newArray.length <= headAsNum) {
      for (let i = newArray.length; i <= headAsNum; i++) {
        newArray[i] = undefined;
      }
    }
    newArray[headAsNum] = withValAtPath(newArray[headAsNum], tail, value);
    return newArray;
  }

  if (typeof input === 'object' && input !== null && !Array.isArray(input)) {
    const newObject = { ...input };
    newObject[head]= withValAtPath(input?.[head], tail, value);
    return newObject;
  }

  return {
    [head]: withValAtPath(input?.[head], tail, value),
  };
}

export function getAtPath(input: any, path: string[]): any {
  if (path.length === 0) {
    return input;
  }
  const [head, ...tail] = path;
  if (typeof input == 'object' && input != null) {
    return getAtPath(input[head], tail);
  }
  return undefined;
}
