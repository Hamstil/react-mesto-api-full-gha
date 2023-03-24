import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import useFormWithValidation from "../hooks/useFormWithValidation";

function Register({ isLoggedIn, handleRegister }) {
  // вычитываем переменные и методы из кастомного хука
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({
      email: "",
      password: "",
    });

  const { email, password } = values;

  // Обработчик нажатия на кнопку
  function handleSubmit(e) {
    // отмена перезагрузки при нажатии на кнопку
    e.preventDefault();

    // Передаем значения управляемых компонентов во внешнй обработчик
    if (isValid) {
      handleRegister(password, email);
    }
    resetForm();
  }

  // редирект на главную
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <main className="content">
      <section className="authorization content__authorization">
        <h2 className="authorization__title">Регистрация</h2>
        <form
          name="register"
          className="authorization__from"
          onSubmit={handleSubmit}
        >
          <label className="authorization__from-field">
            <input
              id="authorization-email"
              type="email"
              value={email || ""}
              onChange={handleChange}
              name="email"
              placeholder="Введите email"
              className="authorization__from-input authorization__from-input_text_email"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="authorization__from-error authorization-email-error authorization__from-error_active">
              {errors.email}
            </span>
          </label>
          <label className="authorization__from-field">
            <input
              id="authorization-password"
              type="password"
              value={password || ""}
              onChange={handleChange}
              name="password"
              placeholder="Придумайте пароль"
              className="authorization__from-input authorization__from-input_text_password"
              minLength="4"
              maxLength="200"
              required
            />
            <span className="authorization__from-error authorization-password-error authorization__from-error_active">
              {errors.password}
            </span>
          </label>
          <button className="authorization__from-button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="authorization__redirect">
          Уже зарегистрированы?
          <Route path="/sign-up">
            <Link to="/sign-in" className="authorization__redirect-link">
              Войти
            </Link>
          </Route>
        </p>
      </section>
    </main>
  );
}

export default Register;
