import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // Контекст пользователя
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем владельца карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Переменная className, для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_enable"
  }`;

  // Функция клика по картинке, поднятия стейта
  function handleCardClick() {
    onCardClick(card);
  }

  // Функция клика по лайку, поднятие стейта
  function handleCardLike() {
    onCardLike(card);
  }

  // Функция удаления крточки, поднятие стейта
  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      {isOwn && (
        <button
          aria-label="кнопка удаления"
          type="button"
          className="element__trash"
          onClick={handleCardDelete}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
        className="element__image"
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="elment__group-like">
          <button
            aria-label="кнопка лайка"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleCardLike}
          ></button>
          <p className="element__count" onClick={handleCardLike}>
            {card.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
}

export default Card;
