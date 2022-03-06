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

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._likeCard();
    });
    
    this._element.querySelector('.card__img-trash').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.card__img-overlay').addEventListener('click', (e) => {
      if(typeof this._handleImageClick === 'function') this._handleImageClick(e);
    });
  }

  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }
}