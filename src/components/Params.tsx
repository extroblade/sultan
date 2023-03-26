import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../store/items/selectors";
import {setFilters, sort, sortBrands, sortPrice, sortSellers} from '../store/items/itemsSlice';
import {getItemsFromAdmin} from "../utils/getItemsFromAdmin";

const Params = () => {
  const { brands, sellers} = useSelector(selectItemData);

  const dispatch = useDispatch()
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState([...getItemsFromAdmin()].sort((a,b) => b.price-a.price)[0].price)

  const [sortedBrands, setSortedBrands] = useState([...brands])
  const [sortedSellers, setSortedSellers] = useState([...sellers])
  const [filtersList, setFiltersList] = useState([])

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
  const [brandsList, setBrandsList] = useState([])
  const [sellersList, setSellersList] = useState([])

  useEffect(() => {
    if ([...new Set(sellersList)].length) {
      dispatch(sortSellers([...new Set(sellersList)]));
    } else dispatch(sortSellers(["all"]));
    dispatch(sort())

  }, [sellersList])

  useEffect(() => {
    dispatch(sortPrice([minValue, maxValue]))
  }, [minValue, maxValue])


  useEffect(() => {
    if ([...new Set(brandsList)].length) {
      dispatch(sortBrands([...new Set(brandsList)]));
    } else dispatch(sortBrands(["all"]));
  }, [brandsList])

  const brander = (event:any) => {
    if(event.target.checked){
      // @ts-ignore
      setBrandsList([...brandsList, event.target.name])
    } else {
      setBrandsList([...brandsList.filter(i => i !== event.target.name)])
    }
  }

  const seller = (event:any) => {
    if(event.target.checked){
      // @ts-ignore
      setSellersList([...sellersList, event.target.name])
    } else {
      setSellersList([...sellersList.filter(i => i !== event.target.name)])
    }
  }

  const getFilters = (event:any) => {
    if(event.target.checked){
      // @ts-ignore
      setFiltersList(() => {
        return [event.target.id]=[event.target.name]
      })
    }
    dispatch(setFilters(filtersList))
  }
  // useEffect(() => {
  //   dispatch(setFilters(filtersList))
  //   dispatch(sort())
  // }, [filtersList])

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
            <input type="checkbox" name={i} id={"seller"} onChange={seller}/>{i}
            <span> ({[...getItemsFromAdmin()].filter(it => it.seller == i || "all"==i).reduce((a:number) => a+1,0)})</span>

          </div>
        )}
      </div>

      <div className={"brand_sort"} style={{"display":"flex", "flexDirection":"column"}}>
        <p>Бренд</p>
        <input type="text" placeholder={"search"} onChange={sortBrandsSearch}/>
        {sortedBrands.map((i:any) =>
          <div key={i}>
            <input type="checkbox" name={i} id={"brand"} onChange={brander}/>{i}
            <span> ({[...getItemsFromAdmin()].filter(it => it.brand == i || "all"==i).reduce((a:number) => a+1,0)})</span>
          </div>
        )}

      </div>
      <div>
        <button onClick={() => console.log('updateFilters()')}>Показать</button>
        <button onClick={() => console.log('reset()')}>Удалить</button>
      </div>

    </div>
  );
};

export default Params;
