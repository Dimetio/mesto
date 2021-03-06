export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__btn-close');

    this._boundHandleButtonClose = this._handleButtonClose.bind(this);
    this._boundHandleOverlayClose = this._handleOverlayClose.bind(this);
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  }

  _handleButtonClose() {
    this.close();
  }

  _handleOverlayClose(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._boundHandleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._boundHandleEscClose);
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', this._boundHandleButtonClose);
    this._popup.addEventListener('click', this._boundHandleOverlayClose);
  }
}