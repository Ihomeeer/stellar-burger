import React from "react";
import { NavLink } from 'react-router-dom';
import appHeaderStyles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader () {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <ul className={appHeaderStyles.list}>

          <div className={appHeaderStyles.navContainer}>
            <li className={`${appHeaderStyles.listElement}`}>
              <NavLink to="/" className={`${appHeaderStyles.navLink} pt-4 pb-4 pr-5 pl-5`}>
                <BurgerIcon type="primary" />
                <p className={`${appHeaderStyles.navTitle}`}>Конструктор</p>
              </NavLink>
            </li>
            <li className={`${appHeaderStyles.listElement}`}>
            <NavLink to="/" className={`${appHeaderStyles.navLink} ${appHeaderStyles.navLinkSecondary} pt-4 pb-4 pr-5 pl-5`}>
              <ListIcon type="secondary" />
              <p className={`${appHeaderStyles.navTitle}`}>Лента заказов</p>
            </NavLink>
            </li>
          </div>

          <li className={appHeaderStyles.listElement}>
            <Logo />
          </li>

          <li className={appHeaderStyles.listElement}>
          <NavLink to="/" className={`${appHeaderStyles.navLink} ${appHeaderStyles.navLinkSecondary} pt-4 pb-4 pr-5 pl-5`}>
            <ProfileIcon type="secondary" />
            <p className={`${appHeaderStyles.navTitle}`}>Личный кабинет</p>
          </NavLink>
          </li>

        </ul>
      </nav>

    </header>
  )
}
export default AppHeader;