import React from 'react';

import mainLogoDark from '../../static/main-logo-white.svg'
import download from '../../static/download.svg'
import telegram from '../../static/telegram.png'
import whatsup from '../../static/whatsup.png'
import visa from '../../static/visa.png'
import mastercard from '../../static/mastercard.png'
import rightWing from '../../static/right-wing.svg'

const Footer = () => {
  return (
    <footer style={{"backgroundColor" : "black", "display": "flex", "flexDirection": "row", "color" : "white"}}>
      <div className="col">
        <img src={mainLogoDark} alt="logo"/>
        <p>
          Компания «Султан» — снабжаем розничные магазины товарами
          "под ключ" в Кокчетаве и Акмолинской области
        </p>
        <div className="sub">
          <p>Подпишись на скидки и акции</p>
          <input type="text" placeholder={"Введите ваш E-mail"}/>
          <img src={rightWing} alt=""/>
        </div>
      </div>

      <div className="col">
        <h3>Меню сайта:</h3>
        <p>О компании</p>
        <p>Доставка и оплата</p>
        <p>Возврат</p>
        <p>Контакты</p>
      </div>

      <div className="col">
        <h3>Категории:</h3>
        <p>Бытовая химия</p>
        <p>Косметика и гигиена</p>
        <p>Товары для дома</p>
        <p>Товары для детей и мам</p>
        <p>Посуда</p>
      </div>

      <div className="col">
        <h3>Скачать прайс-лист:</h3>
        <button>
          Прайс-лист
          <img src={download} alt=""/>
        </button>
        <div className="sub">
          <p>Связь в мессенджерах:</p>
          <img src={whatsup} alt="wu"/>
          <img src={telegram} alt="tg"/>
        </div>
      </div>

      <div className="col">
        <h3>Контакты:</h3>
        <p>+7 (777) 490-00-91</p>
        <p>время работы: 9:00-20:00</p>
        <button>Заказать звонок</button>
        <p>opt.sultan@mail.ru</p>
        <p>На связи в любое время</p>
        <img src={visa} alt="visa"/>
        <img src={mastercard} alt="mc"/>
      </div>

    </footer>
  );
};

export default Footer;
