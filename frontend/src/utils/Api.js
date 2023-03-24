class Api {
  #onResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // получение всей информации пользователя и карточки
  getAllInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  // Получение с сервера данных о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this.#onResponce);
  }

  // Получение первоночальных карточек
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this.#onResponce);
  }

  // Изменение информации профиля
  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this.#onResponce);
  }

  // Создание новой карточки
  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this.#onResponce);
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.#onResponce);
  }

  // Смена аватара
  editAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this.#onResponce);
  }

  // Постановка лайка
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.#onResponce);
  }

  // Снятие лайка
  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.#onResponce);
  }

  // Общий метод для постановки и снятия лайка
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this.#onResponce);
  }
}

const configApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-51",
  headers: {
    authorization: "1b483a2a-ec99-4b2e-b31a-7f2b36b71675",
    "content-type": "application/json",
  },
};

const api = new Api(configApi);

export default api;
