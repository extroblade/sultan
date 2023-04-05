import {calcMaxPrice, filterPrice, calcTotalPrice, calcTotalAmount} from "../utils/functions";
import data from "../utils/test.json"
import {CartItem} from "../store/cart/types";
const testCart = [{"code":"4604049097546","count":12},{"code":"4604049097547","count":14}]

const fullTestCart: CartItem[] = [];
[...data].map(i => {
  fullTestCart.push({code: i.code, count: 1})
})

describe('calcTotalAmount', () => {
  test("Число элементов в массиве", () => {
    expect(calcTotalAmount([1,2,3,4,5,6])).toBe(6)
  })
  test("Число элементов в массиве объектов", () => {
    expect(calcTotalAmount([
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
  test("test json", () => {
    expect(calcMaxPrice(data)).toBe(17312)
  })
})

describe('filterPrice', () => {
  test('Число товаров с ценой 0-2', () => {
    expect(filterPrice(data, [{key: "price", value: [0, 2]}]).length).toBe(2)
  })
  test('Число товаров с ценой больше максимальной', () => {
    expect(filterPrice(data, [{key: "price", value: [1000000, 20000000]}]).length).toBe(0)
  })
})

describe('calcTotalPrice', () => {
  test('Тестовая корзина', () => {
    expect(calcTotalPrice(testCart)).toBe(40)
  })
  test('Все товары из JSON', () => {
    expect(Math.ceil(calcTotalPrice(fullTestCart))).toBe(33189)
  })
})
