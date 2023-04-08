import * as reduxHooks from "react-redux"
import { MemoryRouter } from "react-router";
import App from "../App";
import {CART_ROUTE, CATALOG_ROUTE} from "../utils/consts";
import {render} from "@testing-library/react";
import CartItem from "../components/CartItem/CartItem";

jest.mock('react-redux')

describe('Cart', () => {
  global.scrollTo = jest.fn()

  it('should not be empty', () => {

    const testCart = {
      "cartItems": [
        {"code":"4604049097546","count":1},
        {"code":"4604049097547","count":1},
        {"code":"4604049097548","count":5}
      ],
      "totalPrice":18
    }

    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(testCart)
    const component = render(
      <MemoryRouter initialEntries={[CART_ROUTE]}>
        <App/>
      </MemoryRouter>
    )

    expect(component).toMatchSnapshot();
  })

  it('should be empty', () => {

    const testCart = {"cartItems":[],"totalPrice":0}

    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(testCart)
    const component = render(
      <MemoryRouter initialEntries={[CART_ROUTE]}>
        <App/>
      </MemoryRouter>
    )

    expect(component).toMatchSnapshot();
  })

  it('should be as in snapshot', () => {

    const testItem = { "count": 2, "code": "1" }

    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(testItem)
    const component = render(
      <MemoryRouter initialEntries={[CART_ROUTE]}>
        <CartItem i={testItem}/>
      </MemoryRouter>

    )

    expect(component).toMatchSnapshot();
  })
})
