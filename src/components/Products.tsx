import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchItems} from "../store/actions/fetchItems";
import ItemsType from "../types/items-type";
import ProductCard from "./ProductCard/ProductCard";
import { selectFilter } from '../store/filters/selectors';
import {selectItemData} from "../store/items/selectors";


const Products = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector(selectItemData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const getItems = () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getItems();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    dispatch(fetchItems())
  }, [dispatch])
  const limit: number = 15

  const itemsList: ItemsType[] = items.slice(limit*(currentPage-1), limit*(currentPage))

  return (
    <div className={"items"}>
      {itemsList.map((i, index) =>
        <ProductCard i={i} key={i.code}/>
      )}
    </div>
  );
};

export default Products;
