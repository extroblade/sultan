import React from 'react';
import {sortPriceASC, sortPriceDESC, sortTitleASC, sortTitleDESC} from "../store/items/itemsSlice";
import {useDispatch} from "react-redux";




const Filters = () => {
  const dispatch = useDispatch()

  return (
    <div style={{"display":"flex", "flexDirection":"row"}}>
      <p> уход за телом </p>
      <p>уход за руками</p>
      {/*<div>*/}
      {/*  <div className="field is-grouped" style={{alignItems: "center"}}>*/}
      {/*    <div className="control">*/}
      {/*      <div className="select">*/}
      {/*        <select>*/}
      {/*          <option value="" disabled selected>Sort by</option>*/}
      {/*          <option onChange={() => dispatch(sortPriceASC())}>Price - Lowest to Highest</option>*/}
      {/*          <option onChange={() => dispatch(sortPriceDESC())}>Price - Highest to Lowest</option>*/}
      {/*          <option onChange={() => dispatch(sortTitleDESC())}>Alphabet - A-Z</option>*/}
      {/*          <option onChange={() => dispatch(sortTitleASC())}>Alphabet - Z-A</option>*/}
      {/*        </select>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className={"sort"}>
        <button onClick={() => dispatch(sortPriceASC())}> price asc </button>
        <button onClick={() => dispatch(sortPriceDESC())}> price desc </button>
        <button onClick={() => dispatch(sortTitleDESC())}> title desc </button>
        <button onClick={() => dispatch(sortTitleASC())}> title asc </button>
      </div>

    </div>
  );
};

export default Filters;
