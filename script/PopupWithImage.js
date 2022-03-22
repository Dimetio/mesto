import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup-fullscreen__img');
    this._title = this._popup.querySelector('.popup-fullscreen__title');
  }

  open(title, link) {
    this._image.src = link;
    this._image.alt = title;
    this._title.textContent = title;
    
    super.open();
  }
}