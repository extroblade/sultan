import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../store/items/selectors";
import {setFilters, sort} from '../store/items/itemsSlice';
import {getItemsFromAdmin} from "../utils/getItemsFromAdmin";
import {Filters} from "../store/items/itemsTypes";


const Params = () => {
  const { brands, sellers, filters} = useSelector(selectItemData);

  const dispatch = useDispatch()
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState([...getItemsFromAdmin()].sort((a,b) => b.price-a.price)[0].price)

  const [sortedBrands, setSortedBrands] = useState([...brands])
  const [sortedSellers, setSortedSellers] = useState([...sellers])
  const [filtersList, setFiltersList] = useState([])

  useEffect(() => { //fix ts
    // @ts-ignore
    if(filtersList.find(item => item.key==="price")){
      // @ts-ignore
      setFiltersList([{key: "price", value: [minValue, maxValue]}, ...filtersList.splice(1, filtersList.length)])
    } else {
      // @ts-ignore
      setFiltersList([...filtersList, {key: "price", value: [minValue, maxValue]}])
    }
  },[minValue, maxValue])

  function sortBrandsSearch(event: { target: { value: string } }) {
    setSortedBrands(
      [...[...brands].filter((i:string) => {
        const regex = new RegExp(event.target.value, 'gi')
        return i.match(regex)
      })]
    )
  }

  function sortSellersSearch(event: { target: { value: string } }) {
    setSortedSellers(
      [...[...sellers].filter((i:string) => {
        const regex = new RegExp(event.target.value, 'gi')
        return i.match(regex)
      })]
    )
  }

  useEffect(()=>{
    dispatch(sort())
  },[filters])

  const getFilters = (event:any) => {

    if(event.target.checked){
      // @ts-ignore
      setFiltersList(() => [...filtersList, {key: event.target.id, value: event.target.name}])
    } else {
      if(filtersList.length){
        setFiltersList((f) => f.filter((i:Filters) => {
          return i ? (i.key !== event.target.id) && (i.value !== event.target.name) : false
        }))
      }
    }
  }

  const show = () => {
    dispatch(setFilters([...new Set([...filtersList])] ))
  }

  const reset = () => {

  }

  return (
    <div style={{width: "240px"}}>
      <p>Подбор по параметрам</p>
      <div className="price__input" style={{"display":"flex", "flexDirection":"row"}}>
        <input
          type="number"
          value={Math.abs(minValue)}
          onChange={(event: any) => setMinValue(event.target.value)}
          min={0}
          max={maxValue}
        />
        -
        <input
          type="number"
          value={Math.abs(maxValue)}
          onChange={(event) => setMaxValue(event.target.value)}
          min={minValue}
          max={1000000}
          />
      </div>

      <div className={"seller_sort"} style={{"display":"flex", "flexDirection":"column"}}>
        <p>Производитель</p>
        <input type="text" placeholder={"search"} onChange={sortSellersSearch}/>
        {sortedSellers.map(i =>
          <div key={i}>
            <input type="checkbox" name={i} id={"seller"} onChange={getFilters}/>{i}
            <span> ({[...getItemsFromAdmin()].filter(it => it.seller == i || "all"==i).reduce((a:number) => a+1,0)})</span>
          </div>
        )}

      </div>

      <div className={"brand_sort"} style={{"display":"flex", "flexDirection":"column"}}>
        <p>Бренд</p>
        <input type="text" placeholder={"search"} onChange={sortBrandsSearch}/>

        {sortedBrands.map((i:any) =>
          <div key={i}>
            <input type="checkbox" name={i} id={"brand"} onChange={getFilters}/>{i}
            <span> ({[...getItemsFromAdmin()].filter(it => it.brand == i || "all"==i).reduce((a:number) => a+1,0)})</span>
          </div>
        )}

      </div>
      <div>
        <button onClick={() => show()}>Показать</button>
        <button onClick={() => reset()}>Удалить</button>
      </div>

    </div>
  );
};

export default Params;
