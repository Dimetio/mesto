export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._title = data.title;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
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
    this._element.querySelector('.card__img').alt = this._title; // можно и в переменную положить элемент

    return this._element;
  }

  _setEventListeners() {
    const likeCard = this._element.querySelector('.card__like');
    likeCard.addEventListener('click', (e) => {
      this._likeCard(e);
    });

    const deleteCard = this._element.querySelector('.card__img-trash');
    deleteCard.addEventListener('click', () => {
      this._deleteCard();
    });

    const image = this._element.querySelector('.card__img-overlay');
    image.addEventListener('click', (e) => {
      if (typeof this._handleImageClick === 'function') this._handleImageClick(e);
    });
  }

  _likeCard(e) {
    e.target.classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }
}