import {
  initialCards,
  formEdit,
  inputName,
  inputJob,
  formAdd,
  btnEdit,
  btnAdd,
  formParams,
} from '../utils/constants.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWhithFrom from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const validatorAdd = new FormValidator(formParams, formAdd);
validatorAdd.enableValidation();

const validatorEdit = new FormValidator(formParams, formEdit);
validatorEdit.enableValidation();

const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.cards');
cardList.renderItems();

const popupFullscreen = new PopupWithImage('.popup-fullscreen');
const popupAdd = new PopupWhithFrom('.popup-add', handleAddFormSubmit);
const popupEdit = new PopupWhithFrom('.popup-edit', handleEditFormSubmit);
const userElement = new UserInfo('.profile-info__name', '.profile-info__job');

/* functions */

function createCard(data) {
  const card = new Card(data, '.card-template', openFullscreenPopup);
  return card.generateCard();
}

/* обработчик для добавления */
function handleAddFormSubmit(e, data) {
  e.preventDefault();
  cardList.addItem(createCard(data))
  popupAdd.close();
}

/* обработчик для редактирования */
function handleEditFormSubmit(e, data) {
  e.preventDefault();
  userElement.setUserInfo(data)
  popupEdit.close();
}

function openFullscreenPopup(e) {
  const card = e.target.closest('.card');
  const title = card.querySelector('.card__title').textContent;
  const link = card.querySelector('.card__img').src;

  popupFullscreen.open(title, link);
}

function openEditPopup() {
  const userInfo = userElement.getUserInfo();
  inputName.value = userInfo.name;
  inputJob.value = userInfo.job;

  validatorEdit.updateValidation();

  popupEdit.open();
}

/* events */
btnEdit.addEventListener('click', openEditPopup);
btnAdd.addEventListener('click', () => {
  validatorAdd.updateValidation();
  popupAdd.open();
});