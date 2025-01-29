export function setAtPath(input: any, path: string[], value: any): any {
  if (path.length === 0) {
    return value;
  }
  const [head, ...tail] = path;
  const headAsNum = parseInt(head, 10);
  if (!isNaN(headAsNum)) {
    const newArray = Array.isArray(input) ? input : [];
    if (newArray.length <= headAsNum) {
      for (let i = newArray.length; i <= headAsNum; i++) {
        newArray[i] = undefined;
      }
    }
    newArray[headAsNum] = setAtPath(newArray[headAsNum], tail, value);
    return newArray;
  }
  if (typeof input === 'object' && input !== null && !Array.isArray(input)) {
    input[head]= setAtPath(input?.[head], tail, value);
    return input;
  }
  return {
    [head]: setAtPath(input?.[head], tail, value),
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

export function isSubPathOf(subPath: string[], path: string[]): boolean {
  if (path.length < subPath.length) {
    return false;
  }
  for (let i = 0; i < subPath.length; i++) {
    if (path[i] !== subPath[i]) {
      return false;
    }
  }
  return true;
}

export function pathsOverlap(path1: string[], path2: string[]) {
  return isSubPathOf(path1, path2) || isSubPathOf(path2, path1);
}
