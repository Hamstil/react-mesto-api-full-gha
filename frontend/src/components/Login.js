import React from "react";
import useFormWithValidation from "../hooks/useFormWithValidation";
import { Redirect } from "react-router-dom";

function Login({ isLoggedIn, handleLogin }) {
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
      handleLogin(password, email);
    }
    resetForm();
  }

  // Редирект на главную
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <main className="content">
      <section className="authorization content__authorization">
        <h2 className="authorization__title">Вход</h2>
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
              placeholder="Введите пароль"
              className="authorization__from-input authorization__from-input_text_password"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="authorization__from-error authorization-password-error authorization__from-error_active">
              {errors.password}
            </span>
          </label>
          <button className="authorization__from-button" type="submit">
            Войти
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
