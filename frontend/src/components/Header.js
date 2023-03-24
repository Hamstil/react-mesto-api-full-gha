import React, { useState } from "react";
import headerLogo from "../images/logo.svg";
import { Link, Switch, Route } from "react-router-dom";

function Header({ emailUser, handleLogout }) {
  // стейс переключателя
  const [toggleBurgerMenu, setToggleBurgerMenu] = useState(true);

  // метод переключателя
  const handleToggle = () => {
    setToggleBurgerMenu(!toggleBurgerMenu);
  };

  return (
    <>
      {emailUser ? (
        <>
          <div
            className={toggleBurgerMenu ? "header-menu_hide" : "header-menu"}
          >
            <p className="header-menu__email">{emailUser}</p>
            <Link
              to="/sign-in"
              className="header-menu__link header-menu__link_dark"
              onClick={handleLogout}
            >
              Выйти
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
      <header className="header page__header">
        <img src={headerLogo} alt="Логотип: Mesto" className="header__logo" />
        <Switch>
          <Route exact path="/">
            <div className="header__block-user">
              <p className="header__email">{emailUser}</p>
              <Link
                to="/sign-in"
                className="header__link header__link_dark"
                onClick={handleLogout}
              >
                Выйти
              </Link>
            </div>
            <button
              onClick={handleToggle}
              aria-label="Открыть и закрытие меню пользователя"
              type="button"
              className={`${
                toggleBurgerMenu ? "header__menu-burger" : "header__menu-close"
              }`}
            ></button>
          </Route>
          <Route path="/sign-up">
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          </Route>
        </Switch>
      </header>
    </>
  );
}

export default Header;
