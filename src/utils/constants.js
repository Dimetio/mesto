/* popup-edit */
export const inputName = document.querySelector('.popup__input_name');
export const inputAbout = document.querySelector('.popup__input_about');

/* forms */
export const formAdd = document.forms['popup-add'];
export const formEdit = document.forms['popup-edit'];
export const formAvatar = document.forms['popup-avatar'];

/* profile */
export const avatarImg = document.querySelector('.profile-info__avatar');
export const btnEdit = document.querySelector('.profile-info__edit');
export const btnAdd = document.querySelector('.profile__add');

/* api data */
export const url = 'https://mesto.nomoreparties.co/v1/cohort-39';
export const token = '006bb176-a176-4c97-bbc5-cf71d72d94bc';

export const formParams = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};