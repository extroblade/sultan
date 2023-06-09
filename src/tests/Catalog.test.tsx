import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import cart from '../store/cart/cartSlice';
import App from '../App';
import {MemoryRouter} from 'react-router';
import {CATALOG_ROUTE} from '../utils/consts';
import items from '../store/items/itemsSlice';
import {ItemsType} from '../store/items/itemsTypes';
import data from '../utils/test.json';

describe('Catalog tests', () => {
  global.scrollTo = jest.fn();

  beforeEach(() => {
    const mockStore = configureStore({reducer: {items, cart}});
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[CATALOG_ROUTE]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(cleanup);

  test('filter by category', async () => {
    fireEvent.click(screen.getByTestId(/Подарочные наборы/i));

    await (() => {
      [...data].filter((i: ItemsType) => {
        return i.code === '6' || i.code === '7' || i.code === '12'
          ? expect(screen.findByTestId(i.code)).toBeInTheDocument()
          : expect(screen.findByTestId(i.code)).not.toBeInTheDocument();
      });
    });
  });

  test('all filters values', async () => {
    fireEvent.input(screen.getByTestId('min'), {
      target: {value: 2},
    });
    fireEvent.input(screen.getByTestId(/Бренд1/i), {
      target: {checked: true},
    });
    fireEvent.input(screen.getByTestId(/Производитель2/i), {
      target: {checked: true},
    });
    fireEvent.input(screen.getByTestId(/Производитель1/i), {
      target: {checked: true},
    });
    fireEvent.click(screen.getByTestId('show'));

    await (() => {
      [...data].map((i: ItemsType) => {
        return i.code === '4604049097547' || i.code === '1'
          ? expect(screen.getByTestId(i.code)).toBeInTheDocument()
          : expect(screen.getByTestId(i.code)).not.toBeInTheDocument();
      });
    });
  });

  it('should be on page', () => {
    expect(screen.queryByText('Цена')).toBeInTheDocument();
    expect(screen.queryByText('Производитель')).toBeInTheDocument();
    expect(screen.queryByText('Бренд')).toBeInTheDocument();
    expect(screen.queryByText('Рейтинг')).not.toBeInTheDocument();
  });

  test('price: correct value input', () => {
    const val = Math.floor(Math.random() * 1000000);

    fireEvent.input(screen.getByTestId('min'), {
      target: {value: val},
    });

    expect(+(screen.getByTestId('min') as HTMLInputElement).value).toEqual(val);
  });

  test('price: negative value input', () => {
    const val = Math.floor(Math.random() * -1000000 - 1);

    fireEvent.input(screen.getByTestId('min'), {
      target: {value: val},
    });
    expect(+(screen.getByTestId('min') as HTMLInputElement).value).not.toEqual(
      val
    );
  });

  test('price: text value input', () => {
    const val = 'text';

    fireEvent.input(screen.getByTestId('min'), {
      target: {value: val},
    });
    expect(+(screen.getByTestId('min') as HTMLInputElement).value).not.toEqual(
      val
    );
  });
});
