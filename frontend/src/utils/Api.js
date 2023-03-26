class Api {
  #onResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  constructor(config) {
    this._url = config.url;    
  }

  // получение всей информации пользователя и карточки
  getAllInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  // Получение с сервера данных о пользователе
  getUserInfo() {    
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    }).then(this.#onResponce);
  }

  // Получение первоночальных карточек
  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      "content-type": "application/json",
      },
    }).then(this.#onResponce);
  }

  // Изменение информации профиля
  editProfile(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      "content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this.#onResponce);
  }

  // Создание новой карточки
  addNewCard(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      "content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this.#onResponce);
  }

  // Удаление карточки
  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      "content-type": "application/json",
      },
    }).then(this.#onResponce);
  }

  // Смена аватара
  editAvatar(data) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      "content-type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this.#onResponce);
  }

  // Постановка лайка
  addLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      "content-type": "application/json",
      },
    }).then(this.#onResponce);
  }

  // Снятие лайка
  removeLike(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      "content-type": "application/json",
      },
    }).then(this.#onResponce);
  }

  // Общий метод для постановки и снятия лайка
  changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      "content-type": "application/json",
      },
    }).then(this.#onResponce);
  }
}



const configApi = {  
  url: "http://localhost:3000",
  // url: "https://mesto.nomoreparties.co/v1/cohort-51", 
};

const api = new Api(configApi);

export default api;
