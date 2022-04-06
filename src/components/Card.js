export default class Card {
  constructor(data, currentId, cardSelector, {
    handleCardClick,
    handleLikeClick,
    handleCardDelete,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._currentId = currentId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _showIcon() {
    if (this._ownerId === this._currentId) {
      this._element.querySelector('.card__img-trash').classList.add('card__img-trash-visible');
    }
  }

  generateCard(data) {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;

    this._showIcon();

    this.setLike(data);

    return this._element;
  }

  isLiked() {
    return this._isLiked;
  }

  setLike(data) {
    this._isLiked =
      data
      .likes
      .filter((item) => {
        return item._id === this._currentId;
      })
      .length > 0;

    this._element.querySelector('.card__like-counter').textContent = data.likes.length;

    if (this._isLiked) {
      this._element.querySelector('.card__like').classList.add('card__like_active');
    } else {
      this._element.querySelector('.card__like').classList.remove('card__like_active');
    }
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => this._handleLikeClick());
    this._element.querySelector('.card__img-trash').addEventListener('click', () => this._handleCardDelete());
    this._element.querySelector('.card__img-overlay').addEventListener('click', () => this._handleCardClick(this._name, this._link));
  }
  
  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}