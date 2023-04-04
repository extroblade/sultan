import {functions, calcMaxPrice} from "./functions";

import data from "./test.json"

describe('calcTotalAmount', () => {
  test("Число элементов в массиве", () => {
    expect(functions([1,2,3,4,5,6])).toBe(6)
  })
  test("Число элементов в массиве объектов", () => {
    expect(functions([
      {a: 1, b: 2},
      {a: 1, b: 2},
      {a: 1, b: 2},
      {a: 1, b: 2},
      {a: 1, b: 2},
      {a: 1, b: 2}
    ])).toBe(6)
  })
})

describe('calcMaxPrice', () => {
  test("test data", () => {
    expect(calcMaxPrice(data)).toBe(17312)
  })
})

