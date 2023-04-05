import React, {useEffect, useState} from 'react';
import styles from "./SideFilters.module.css";
import FilterByPrice from "./FilterByPrice";
import FilterByField from "./FilterByField";
import {ReactComponent as TrashIcon} from "../../static/delete.svg";
import {useDispatch} from "react-redux";
import {calcMaxPrice, resetInputs} from "../../utils/functions";
import {getItemsFromAdmin} from "../../utils/functions";
import {setCategories, setCurrentPage, setFilters, filterItems} from "../../store/items/itemsSlice";
import {iFilters} from "./SideFilters";

const AllSorts = () => {
  const dispatch = useDispatch()
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(calcMaxPrice(getItemsFromAdmin()))
  const [filtersList, setFiltersList] = useState<iFilters[]>([])

  useEffect(() => {
    filtersList.find(item => item.key==="price")
      ? setFiltersList([
        {key: "price", value: [minValue, maxValue]},
        ...filtersList.splice(1, filtersList.length)
      ])
      : setFiltersList([...filtersList, {key: "price", value: [minValue, maxValue]}])
  },[minValue, maxValue])

  const getFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.checked){
      setFiltersList(() => [...filtersList, {key: event.target.id, value: event.target.name}])
    } else if (filtersList.length) {
      setFiltersList((f) => f.filter((i) => {
        return i ? ((i.key !== event.target.id) || (i.value !== event.target.name)) : false
      }))
    }
  }

  const show = () => {
    dispatch(setFilters([...new Set([...filtersList])] ))
    dispatch(filterItems())

    dispatch(setCurrentPage(1))
  }

  const reset = () => {
    resetInputs()
    setMinValue(0)
    setMaxValue(calcMaxPrice(getItemsFromAdmin()))
    dispatch(setFilters([] ))
    dispatch(setCategories(""))
  }


  return (
    <>
      <FilterByPrice
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
      />

      <FilterByField
        field={"seller"}
        getFilters={getFilters}
      > Производитель </FilterByField>

      <FilterByField
        field={"brand"}
        getFilters={getFilters}
      > Бренд </FilterByField>

      <div className={styles.btns}>
        <button className={styles.btn__text} onClick={() => show()}>
          <span>Показать</span>
        </button>
        <button className={styles.btn__img} onClick={() => reset()}>
          <TrashIcon/>
        </button>
      </div>
    </>
  );
};

export default AllSorts;
