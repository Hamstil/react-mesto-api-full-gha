import React from "react";
import success from "../images/success.png";
import fail from "../images/fail.png";

function InfoTooltip({ isOpen, onClose, textIsSuccess, textIsFail }) {
  return (
    <div
      className={`popup popup_info_tooltip ${isOpen ? "popup_is-opened" : ""}`}
    >
      <div className="popup__content">
        <img
          className="popup__image-tooltip"
          alt="Оповищения авторизации или регистрации"
          src={isOpen === "success" ? success : fail}
        />
        <h2 className="popup__title-tooltip">
          {isOpen === "success" ? textIsSuccess : textIsFail}
        </h2>
        <button
          aria-label="Закрыть диалоговое окно"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
