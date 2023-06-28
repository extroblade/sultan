import React, {useEffect} from 'react';

const Shop = () => {
  useEffect(() => {
    document.title = `Султан`;
  }, []);
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      Главная страница магазина
    </div>
  );
};

export default Shop;
