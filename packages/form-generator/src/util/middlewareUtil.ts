import type { GetMiddleware, SetMiddleware } from "../types";

export function combineMiddlewaresWithSetter(
  setMiddlewares: SetMiddleware[],
  setter: (value: any, path: string[]) => void
) {
  return (value: any, path: string[]) => {
    let i = setMiddlewares.length - 1;
    const next = (val: string[], path: string[]) => {
      if (i < 0) {
        setter(val, path);
      } else {
        setMiddlewares[i--](val, path, next);
      }
    };
    next(value, path);
  };
}

export function combineMiddlewaresWithGetter(
  getMiddlewares: GetMiddleware[],
  getter: (path: string[]) => any
) {
  return (path: string[]) => {
    let i = getMiddlewares.length - 1;
    const next = (path: string[]) => {
      if (i < 0) {
        return getter(path);
      } else {
        return getMiddlewares[i--](path, next);
      }
    };
    return next(path);
  };
}