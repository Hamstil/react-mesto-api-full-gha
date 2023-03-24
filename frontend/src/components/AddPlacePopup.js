import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  // вычитываем переменные и методы из кастомного хука
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({
      name: "",
      link: "",
    });

  const { name, link } = values;

  // Метод по нажатию на кнопку создать
  function handleSubmit(e) {
    // Отмена действия по нажатию на кнопку
    e.preventDefault();

    if (isValid) {
      onAddPlace({
        name: name,
        link: link,
      });
    }
  }

  // Метод отчистки инпутов при открытии попапа
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      textButton={isLoading ? "Создаю..." : "Создать"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
    >
      <label className="popup-form__field">
        <input
          id="place-name"
          type="text"
          name="name"
          value={name || ""}
          onChange={handleChange}
          placeholder="Введите название места"
          className="popup-form__input popup-form__input_text_name-place"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup-form__error place-name-error popup-form__error_active">
          {errors.name}
        </span>
      </label>
      <label className="popup-form__field">
        <input
          id="place-link"
          type="url"
          name="link"
          value={link || ""}
          onChange={handleChange}
          placeholder="Введите ссылку на изображение"
          className="popup-form__input popup-form__input_text_place-link"
          required
        />
        <span className="popup-form__error place-link-error popup-form__error_active">
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
