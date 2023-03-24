import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useFormWithValidation from "../hooks/useFormWithValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  // Контекст пользователя
  const currentUser = useContext(CurrentUserContext);

  // вычитываем переменные и методы из кастомного хука
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormWithValidation({
      name: "",
      about: "",
    });

  const { name, about } = values;

  // Изменение состояния имя и описания при вводе
  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, isOpen]);

  // сброс формы
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // Обработчик нажатия на кнопку
  function handleSubmit(e) {
    // отмена перезагрузки при нажатии на кнопку
    e.preventDefault();

    // Передаем значения управляемых компонентов во внешнй обработчик
    if (isValid) {
      onUpdateUser({
        name: name,
        about: about,
      });
    }
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      textButton={isLoading ? "Сохранияю..." : "Сохранить"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
    >
      <label className="popup-form__field">
        <input
          id="profile-name"
          type="text"
          value={name || ""}
          onChange={handleChange}
          name="name"
          placeholder="Введите имя"
          className="popup-form__input popup-form__input_text_name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup-form__error profile-name-error popup-form__error_active">
          {errors.name}
        </span>
      </label>
      <label className="popup-form__field">
        <input
          id="profile-job"
          type="text"
          value={about || ""}
          onChange={handleChange}
          name="about"
          placeholder="Введите род деятельности"
          className="popup-form__input popup-form__input_text_job"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup-form__error profile-job-error popup-form__error_active">
          {errors.about}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
