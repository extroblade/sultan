import React from 'react';
import styles from './Header.module.css'
import HeaderMobile from "./HeaderMobile";
import HeaderMain from "./HeaderMain";


const Header = () => {


  return (
    <header className={styles.header}>
      <HeaderMobile/>
      <HeaderMain/>
    </header>
  );
};

export default Header;
