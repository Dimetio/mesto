import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._from = this._popup.querySelector('.popup__form');
    this._submitForm = submitForm;
    this._boundHandleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    this._submitForm(e, this._getInputValues());
  }

  _getInputValues() {
    this._fromValues = {};

    this._from.querySelectorAll('.popup__input').forEach(input => {
      this._fromValues[input.name] = input.value;
    });

    return this._fromValues;
  }

  close() {
    super.close();
    this._from.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._from.addEventListener('submit', this._boundHandleSubmit)
  }
}