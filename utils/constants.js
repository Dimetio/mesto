export const initialCards = [{
  title: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  title: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  title: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  title: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  title: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  title: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];
  
/* popup-edit */
const popupEdit = document.querySelector('.popup-edit');
export const formEdit = popupEdit.querySelector('.popup__form');
export const inputName = popupEdit.querySelector('.popup__input_name');
export const inputJob = popupEdit.querySelector('.popup__input_job');
/* popup-add */
const popupAdd = document.querySelector('.popup-add');
export const formAdd = popupAdd.querySelector('.popup__form');
/* profile */
export const btnEdit = document.querySelector('.profile-info__edit');
export const btnAdd = document.querySelector('.profile__add');

export const formParams = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};
