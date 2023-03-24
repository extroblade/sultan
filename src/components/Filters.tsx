import React from 'react';
import {sortBrands, sortPriceASC, sortPriceDESC, sortTitleASC, sortTitleDESC} from "../store/items/itemsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectItemData} from "../store/items/selectors";

const Filters = () => {
  const { brands } = useSelector(selectItemData);

  const dispatch = useDispatch()

  return (
    <div style={{"display":"flex", "flexDirection":"row"}}>
      <p> уход за телом </p>
      <p>уход за телом</p>
      <p>уход за телом</p>
      <p>уход за телом</p>
      <p>уход за телом</p>
      <p>уход за телом</p>
      <p>уход за телом</p>

      <div className={"sort"}>
        <button onClick={() => dispatch(sortPriceASC())}> price asc </button>
        <button onClick={() => dispatch(sortPriceDESC())}> price desc </button>
        <button onClick={() => dispatch(sortTitleDESC())}> title desc </button>
        <button onClick={() => dispatch(sortTitleASC())}> title asc </button>
      </div>

      <div className={"sort"}>
        {brands.map(i =>
          <button onClick={() => dispatch(sortBrands(i))} key = {i}> {i} </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
