import { useState, useEffect, useCallback } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { regitration, login, getEmail } from "../utils/auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const history = useHistory();

  // Получение данных о пользователе и карточках
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getAllInfo()
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  // метод проверки токена
  const tokenCheck = useCallback(() => {
    setIsLoading(true);
    let jwt = localStorage.getItem("token");
    if (jwt) {
      getEmail(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailUser(res.data.email);
          }
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => setIsLoading(false));
    }
  }, []);

  // Проверка токена при монтировании компонента App
  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  // метод логина
  const handleLogin = useCallback((password, email) => {
    setIsLoading(true);
    login(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          setEmailUser(email);
        }
      })
      .catch(() => {
        setIsInfoTooltipPopupOpen("fail");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // метод регистрации
  const handleRegister = useCallback(
    (password, email) => {
      setIsLoading(true);
      regitration(password, email)
        .then((res) => {
          setIsInfoTooltipPopupOpen("success");
          history.push("/sign-in");
        })
        .catch((err) => {
          console.log(err);
          setIsInfoTooltipPopupOpen("fail");
        })
        .finally(() => setIsLoading(false));
    },
    [history]
  );

  // метод разлогинивания
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setEmailUser("");
  }, []);

  // Функция добавления и удаление лайков через api
  function handleCardLike(card) {
    // Проверяем есть ли лайк на карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обнавленные данные
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  // Функуия удаления карточки
  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        // Создает новый массив ислючая карточку которую нужно удалить
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  // Обработчик обнавления профиля
  function handleUpdateUser(profileInfo) {
    setIsLoading(true);
    api
      .editProfile(profileInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  // Обработчик обнавления аватара
  function handleUpdateAvatar(avatarLink) {
    setIsLoading(true);
    api
      .editAvatar(avatarLink)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  // Обработчик добавления новой карточки
  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => setIsLoading(false));
  }

  // Функция состояния попапа Аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Функция состояния попапа Профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Функция состояния попапа Места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Функция состояния попапа Удаления
  function handleDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  }

  // Функция клика по карточке изображения
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  // Функция состояния закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header emailUser={emailUser} handleLogout={handleLogout} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            isLoggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onDeleteCard={handleDeleteClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
            cards={cards}
          />
          <Route path="/sign-up">
            <Register isLoggedIn={isLoggedIn} handleRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
              emailUser={emailUser}
            />
          </Route>
          <Route path="*">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        ></EditAvatarPopup>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        ></EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        ></AddPlacePopup>

        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={selectedCard}
          isLoading={isLoading}
        ></DeletePopup>

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          textIsSuccess={"Вы успешно зарегистрировались!"}
          textIsFail={"Что-то пошло не так! Попробуйте ещё раз."}
        ></InfoTooltip>

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          isOpen={isImagePopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
