import {Navigate} from 'react-router-dom';
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  CATALOG_ROUTE,
  PRODUCT_ROUTE,
} from './utils/consts';
import Item from './pages/Item/Item';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';
import Admin from './pages/Admin/Admin';
import React from 'react';

export default interface RouteObject {
  path: string;
  element: React.ReactNode;
}

export const publicRoutes: RouteObject[] = [
  {path: CATALOG_ROUTE, element: <Catalog />},
  {path: CART_ROUTE, element: <Cart />},
  {path: PRODUCT_ROUTE + '/:code', element: <Item />},
  {path: '*', element: <Navigate to={CATALOG_ROUTE} replace />},
];

export const authRoutes: RouteObject[] = [
  {path: ADMIN_ROUTE, element: <Admin />},
];
