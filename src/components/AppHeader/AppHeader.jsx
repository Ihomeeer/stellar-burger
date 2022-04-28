// тут хидер - лого, кнопки всякие важные (лента заказов, личный кабинет и проч.)
import { NavLink } from 'react-router-dom';
import appHeaderStyles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <nav className={appHeaderStyles.nav}>
        <ul className={appHeaderStyles.list}>

          <div className={appHeaderStyles.navContainer}>
            <li className={`${appHeaderStyles.listElement}`}>
              <NavLink exact to="/" className={`${appHeaderStyles.navLink} pt-4 pb-4 pr-5 pl-5`} activeClassName={appHeaderStyles.navLinkActive}>
                <BurgerIcon type='secondary' />
                <p className="text text_type_main-default">Конструктор</p>
              </NavLink>
            </li>
            <li className={`${appHeaderStyles.listElement}`}>
              <NavLink exact to="/11" className={`${appHeaderStyles.navLink} pt-4 pb-4 pr-5 pl-5`} activeClassName={appHeaderStyles.navLinkActive}>
                <ListIcon type='secondary' />
                <p className="text text_type_main-default">Лента заказов</p>
              </NavLink>
            </li>
          </div>

          <li className={appHeaderStyles.listElement}>
            <NavLink exact to="/">
              <Logo />
            </NavLink>
          </li>

          <li className={appHeaderStyles.listElement}>
            <NavLink exact to="/profile" className={`${appHeaderStyles.navLink} pt-4 pb-4 pr-5 pl-5`} activeClassName={appHeaderStyles.navLinkActive}>
              <ProfileIcon type='secondary' />
              <p className="text text_type_main-default">Личный кабинет</p>
            </NavLink>
          </li>

        </ul>
      </nav>

    </header>
  )
}

export default AppHeader;