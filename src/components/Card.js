export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.title;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._title;

    return this._element;
  }

  _setEventListeners() {
    this._likeElement = this._element.querySelector('.card__like');
    this._likeElement.addEventListener('click', () => {
      this._likeCard();
    });

    this._deleteElement = this._element.querySelector('.card__img-trash');
    this._deleteElement.addEventListener('click', () => {
      this._deleteCard();
    });

    this._imageElement = this._element.querySelector('.card__img-overlay');
    this._imageElement.addEventListener('click', () => this._handleCardClick(this._title, this._link));
  }

  _likeCard() {
    this._likeElement.classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}