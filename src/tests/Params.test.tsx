import {
  cleanup,
  fireEvent,
  render, screen,
} from "@testing-library/react";
import '@testing-library/jest-dom'

import '@testing-library/jest-dom/extend-expect';

import SideFilters from "../components/SideFilters/SideFilters";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import items from "../store/items/itemsSlice";


describe('Params filters', () => {
  global.scrollTo = jest.fn()

  beforeEach(() => {
    const mockStore = configureStore({ reducer: {items} });
    render(
      <Provider store={mockStore}>
        <SideFilters/>
      </Provider>
    );
  })

  afterEach(cleanup)

  test('Отображение фильтров', () => {
    expect(screen.queryByText('Цена')).not.toBe(null);
    expect(screen.queryByText('Производитель')).not.toBe(null);
    expect(screen.queryByText('Бренд')).not.toBe(null);
    expect(screen.queryByText('Рейтинг')).toBe(null);
  });

  test('Ввод корректной цены', () => {
    const val = Math.floor(Math.random() * 1000000);

    fireEvent.input(screen.getByTestId('min'), {
      target: {value: val}
    })

    expect(+(screen.getByTestId('min') as HTMLInputElement).value).toEqual(val)
  });

  test('Ввод отрицательной цены', () => {
    const val = Math.floor(Math.random() * (-1000000) - 1);

    fireEvent.input(screen.getByTestId('min'), {
      target: {value: val}
    })
    expect(+(screen.getByTestId('min') as HTMLInputElement).value).not.toEqual(val)
  });

  test('Ввод текста вместо цены', () => {
    const val = 'text'

    fireEvent.input(screen.getByTestId('min'), {
      target: {value: val}
    })
    expect(+(screen.getByTestId('min') as HTMLInputElement).value).not.toEqual(val)
  });
});
