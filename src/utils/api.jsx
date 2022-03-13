import React from 'react';
import { baseURL } from './constants';

//Класс содержит всю логику для работы с API
class Api extends React.Component {
  constructor({props, baseUrl, headers}) {
    super(props);
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //проверка состояния промиса, чтобы не писать одно и то же. Это на будущее, так сказать
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получение списка всех ингредиентов с сервера
  getAllIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._checkStatus(res));
  }

  //Послать все на сервер и получить номер заказа
  sendOrderInfo(info) {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "ingredients": info
      }),
    })
    .then(res => this._checkStatus(res));
  }
}

const api = new Api({
  baseUrl: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;