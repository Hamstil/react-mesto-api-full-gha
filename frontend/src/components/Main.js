import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  cards,
  onAddPlace,
  onCardClick,
  onEditAvatar,
  onEditProfile,
  onCardLike,
  onCardDelete,
}) {
  // Элемент карточек
  const cardsElement = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  // Контекст текущего пользователя
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__image" onClick={onEditAvatar}>
          <div
            style={{
              backgroundImage: `url(${currentUser.avatar})`,
            }}
            className="profile__avatar"
          ></div>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            aria-label="Изменить профиль"
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          aria-label="Добавить карточку"
          type="button"
          className="profile__add-card-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section aria-label="Карточки мест" className="section content__section">
        <ul className="elements-content">{cardsElement}</ul>
      </section>
    </main>
  );
}

export default Main;
