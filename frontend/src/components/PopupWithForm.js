import React from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  textButton,
  children,
  onSubmit,
  isValid,
}) {
  return (
    <div
      className={`popup popup_edit_${name} ${!isOpen ? "" : "popup_is-opened"}`}
    >
      <div className="popup__content">
        <button
          aria-label="Закрыть диалоговое окно"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          name={`edit-${name}`}
          className={`popup-form popup-form_type_${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            aria-label={`Кнопка ${textButton}`}
            type="submit"
            className={`popup-form__button ${
              !isValid ? "popup-form__button_disabled" : ""
            }`}
            disabled={!isValid}
          >
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
