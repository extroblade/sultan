import React from 'react';
import styles from './Footer.module.css'

import telegram from '../../static/telegram.png'
import whatsup from '../../static/whatsup.png'
import visa from '../../static/visa.png'
import mastercard from '../../static/mastercard.png'
import mainLogoDark from '../../static/main-logo-white.svg'

import { ReactComponent as DownloadIcon } from '../../static/download.svg';
import { ReactComponent as RightWingIcon } from '../../static/right-wing.svg';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.col}>
        <img src={mainLogoDark} alt="logo" className={styles.logo}/>
        <p className={styles.long}>
          Компания «Султан» — снабжаем розничные магазины товарами
          "под ключ" в Кокчетаве и Акмолинской области
        </p>
        <div className={styles.sub}>
          <p>Подпишись на скидки и акции</p>
          <input type="text" placeholder={"Введите ваш E-mail"}/>
          <RightWingIcon/>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          <h3>Меню сайта:</h3>
          <Link to={"#"} className={styles.link}>
            О компании
          </Link>
          <Link to={"#"} className={styles.link}>
            Доставка и оплата
          </Link>
          <Link to={"#"} className={styles.link}>
            Возврат
          </Link>
          <Link to={"#"} className={styles.link}>
            Контакты
          </Link>
        </div>

        <div className={styles.col}>
          <h3>Категории:</h3>
          <Link to={"#"} className={styles.link}>
            Бытовая химия
          </Link>
          <Link to={"#"} className={styles.link}>
            Косметика и гигиена
          </Link>
          <Link to={"#"} className={styles.link}>
            Товары для дома
          </Link>
          <Link to={"#"} className={styles.link}>
            Товары для детей и мам
          </Link>
          <Link to={"#"} className={styles.link}>
            Посуда
          </Link>
        </div>
      </div>


      <div className={styles.col}>
        <h3>Скачать прайс-лист:</h3>
        <button>
          Прайс-лист
          <DownloadIcon/>
        </button>
        <div className={styles.col}>
          <p>Связь в мессенджерах:</p>
          <div className={styles.row}>
            <img src={whatsup} alt="wu"/>
            <img src={telegram} alt="tg"/>
          </div>
        </div>
      </div>

      <div className={styles.col}>
        <h3>Контакты:</h3>
        <p>+7 (777) 490-00-91</p>
        <p>время работы: 9:00-20:00</p>
        <button>Заказать звонок</button>
        <p>opt.sultan@mail.ru</p>
        <p>На связи в любое время</p>
        <div className={styles.row}>
          <img src={visa} alt="visa" className={styles.promo__img}/>
          <img src={mastercard} alt="mc" className={styles.promo__img}/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
