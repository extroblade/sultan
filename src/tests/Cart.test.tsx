import * as reduxHooks from "react-redux";
import {cleanup, render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {CART_ROUTE} from "../utils/consts";
import App from "../App";
jest.mock('react-redux')

describe('asd', () => {
  global.scrollTo = jest.fn()

  beforeEach(() => {
    const testCart = {
      "cartItems": [
        {"code":"4604049097546","count":1},
        {"code":"4604049097547","count":1},
        {"code":"4604049097548","count":5}
      ],
      "totalPrice":18
    }

    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(testCart)

    render(
      <MemoryRouter initialEntries={[CART_ROUTE]}>
        <App/>
      </MemoryRouter>
    )
  })

  afterEach(cleanup)

  it("should return correct value", async () => {
    expect(screen.getByTestId("amount"+"4604049097546").innerHTML).toBe("1")
  })

});
