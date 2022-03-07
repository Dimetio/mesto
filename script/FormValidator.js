export default class FormValidator {
  constructor(params, targetForm) {
    this._inputSelector = params.inputSelector;
    this._submitButtonSelector = params.submitButtonSelector;
    this._inactiveButtonClass = params.inactiveButtonClass;
    this._inputErrorClass = params.inputErrorClass;
    this._errorClass = params.errorClass;
    
    this._targetForm = targetForm;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._targetForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._targetForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid(input) {
    return input.validity.valid;
  }

  _checkInputValidity(inputElement) {
    const res = this._isValid(inputElement);

    if (!res) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement)
    }

    return res;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !this._isValid(inputElement);
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }  

  _setEventListeners() {
    const inputList = Array.from(this._targetForm.querySelectorAll(this._inputSelector));
    const buttonElement = this._targetForm.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  updateValidation() {
    const inputList = Array.from(this._targetForm.querySelectorAll(this._inputSelector));
    const buttonElement = this._targetForm.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState(inputList, buttonElement);
  }

  enableValidation() {
    this._setEventListeners();

    this._targetForm.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }
}