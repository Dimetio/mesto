import './index.css';

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

import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWhithFrom from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

const validatorAdd = new FormValidator(formParams, formAdd);
validatorAdd.enableValidation();

const validatorEdit = new FormValidator(formParams, formEdit);
validatorEdit.enableValidation();

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.cards');
cardList.renderItems(initialCards);

const popupFullscreen = new PopupWithImage('.popup-fullscreen');
const popupAdd = new PopupWhithFrom('.popup-add', handleAddFormSubmit);
const popupEdit = new PopupWhithFrom('.popup-edit', handleEditFormSubmit);
const userElement = new UserInfo('.profile-info__name', '.profile-info__job');

popupFullscreen.setEventListeners();
popupAdd.setEventListeners();
popupEdit.setEventListeners();

/* functions */

function createCard(data) {
  const card = new Card(data, '.card-template', (title, link) => popupFullscreen.open(title, link));
  return card.generateCard();
}

/* обработчик для добавления */
function handleAddFormSubmit(e, data) {
  cardList.addItem(createCard(data))
  popupAdd.close();
}

/* обработчик для редактирования */
function handleEditFormSubmit(e, data) {
  e.preventDefault();
  userElement.setUserInfo(data)
  popupEdit.close();
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