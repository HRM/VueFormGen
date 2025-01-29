import {deepAssign} from "../util/valueUtil"
import { expect, test } from "vitest";

test("deepAssign should work for objects",()=>{
 let a:object = {}
 let b = {
    test1: "test",
    test2: 35,
    test3: [1,4,5,6],
    test4: {test1:"test",test2:12}
 }
 deepAssign(a,b)
 expect(a).toEqual(b);
 expect(a['test4' as keyof object]).not.toBe(b.test4);
})

test("deepAssign should work for objects with extra fields", () => {
  let a: object = {test5:"test"};
  let b = {
    test1: "test",
    test2: 35,
    test3: [1, 4, 5, 6],
    test4: { test1: "test", test2: 12 },
  };
  deepAssign(a, b);
  expect(a).toEqual(b);
});

test("deepAssign should work for objects recursively", () => {
  const test4 = { test5: "test", };
  let a: object = {test4};
  let b = {
    test1: "test",
    test2: 35,
    test3: [1, 4, 5, 6],
    test4: { test1: "test", test2: 12 },
  };
  deepAssign(a, b);
  expect(a).toEqual(b);
  expect(a["test4" as keyof object]).toBe(test4);
});

test("deepAssign should work for arrays", () => {
  let a = [] as any[];
  let b = [{test1:"test"},46];
  deepAssign(a, b);
  expect(a).toEqual(b);
  expect(a[0]).not.toBe(b[0]);
});

test("deepAssign should work for arrays with extra keys", () => {
  let a = [1,2,3] as any[];
  let b = [{ test1: "test" }, 46];
  deepAssign(a, b);
  expect(a).toEqual(b);
});

test("deepAssign should work for arrays recursively", () => {
const level1Array = [] as any[];
  let a = [level1Array, 2, 3] as any[];
  let b = [[15], 46];
  deepAssign(a, b);
  expect(a).toEqual(b);
  expect(a[0]).toBe(level1Array)
});

test("deepAssign should check if both values are object or array", () => {
  let a = {};
  let b = [] as any[];
  expect(() => deepAssign(a, b)).toThrowError();
});