import React, {useEffect, useState} from 'react';
import styles from "./Params.module.css";
import FilterByPrice from "./FilterByPrice";
import FilterByField from "./FilterByField";
import {ReactComponent as TrashIcon} from "../../static/delete.svg";
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../../store/items/selectors";
import {calcMaxPrice} from "../../utils/functions";
import {getItemsFromAdmin} from "../../utils/functions";
import {setCategories, setCurrentPage, setFilters, sort, sortCat, updateItems} from "../../store/items/itemsSlice";
import {iFilters} from "./Params";

const AllSorts = () => {
  const { items, filters} = useSelector(selectItemData);

  const dispatch = useDispatch()
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(calcMaxPrice(getItemsFromAdmin()))

  const [cat, setCat] = useState("")
  const [filtersList, setFiltersList] = useState<iFilters[]>([...filters])
  useEffect(() => {
    filtersList.find(item => item.key==="price")
      ? setFiltersList([
        {key: "price", value: [minValue, maxValue]},
        ...filtersList.splice(1, filtersList.length)
      ])
      : setFiltersList([...filtersList, {key: "price", value: [minValue, maxValue]}])
  },[minValue, maxValue])

  useEffect(()=>{
    dispatch(sort())
  },[filters])

  useEffect(()=>{
    dispatch(updateItems)
  },[items])

  useEffect(()=> {
    window.scrollTo(0, 0)
  },[items, cat, filters])

  useEffect(()=>{
    dispatch(setCategories(cat))
    dispatch(sortCat())
  },[cat])

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
    dispatch(setCurrentPage(1))
  }

  const reset = () => {
    const inputs = document.getElementsByTagName('input');

    for (let index = 0; index < inputs.length; ++index) {
      if(inputs[index].type === "text"){
        inputs[index].value = ''
      } else if (inputs[index].type === "checkbox" && inputs[index].checked){
        inputs[index].checked = !inputs[index].checked
      }
    }

    setMinValue(0)
    setMaxValue(calcMaxPrice(getItemsFromAdmin()))
    dispatch(setFilters([] ))
    setCat(() => "")
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
