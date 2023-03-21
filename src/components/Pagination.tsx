import React from 'react';
import ItemsType from "../types/items-type";
import data from "../test.json";

const Pagination = () => {
  const item: ItemsType[] = data

  const limit = 15
  const pageCount = Math.ceil(item.reduce(a => a+1, 0) / limit)

  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i+1)
  }

  return (
    <div>
      {pages.map((p) =>
        <button key={p}>
          {p}
        </button>
      )}
    </div>
  );
};

export default Pagination;
