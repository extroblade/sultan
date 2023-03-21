import { Navigate } from "react-router-dom";
import {ADMIN_ROUTE, CART_ROUTE, CATALOG_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE} from "./utils/consts";
import Item from "./pages/Item";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Catalog from "./pages/Catalog";
import Admin from "./pages/Admin";
import RouteObject from "./types/route-object";

export const publicRoutes: RouteObject[] = [
  {path: SHOP_ROUTE, element: <Shop/>},
  {path: CATALOG_ROUTE, element: <Catalog/>},
  {path: CART_ROUTE, element: <Cart/>},
  {path: PRODUCT_ROUTE+"/:code", element: <Item/>},
  {path: "*", element: <Navigate to="/" replace />}
]

export const authRoutes: RouteObject[] = [
  {path: ADMIN_ROUTE, element: <Admin/>},
]