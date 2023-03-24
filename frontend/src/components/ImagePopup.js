import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_view_image popup_theme_dark ${
        isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__content-image">
        <button
          aria-label="Закрыть диалоговое окно"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__text">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
