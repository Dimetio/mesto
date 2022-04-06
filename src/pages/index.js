import './index.css';

import {
  formEdit,
  inputName,
  inputAbout,
  formAdd,
  btnEdit,
  btnAdd,
  formParams,
  url,
  token,
  formAvatar,
  avatarImg
} from '../utils/constants.js';

import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWhithFrom from '../components/PopupWithForm';
import PopupWithSubmit from '../components/PopupWithSubmit';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';

const validatorAdd = new FormValidator(formParams, formAdd);
const validatorEdit = new FormValidator(formParams, formEdit);
const validatorAvatar = new FormValidator(formParams, formAvatar);

validatorAdd.enableValidation();
validatorEdit.enableValidation();
validatorAvatar.enableValidation();

const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
}, '.cards');



const popupFullscreen = new PopupWithImage('.popup-fullscreen');
const popupAdd = new PopupWhithFrom('.popup-add', handleAddFormSubmit);
const popupEdit = new PopupWhithFrom('.popup-edit', handleEditFormSubmit);
const popupAvatar = new PopupWhithFrom('.popup-avatar', handleAvatarFromSubmit);
const popupDeleteCard = new PopupWithSubmit('.popup-delete');
const userElement = new UserInfo('.profile-info__name', '.profile-info__about', '.profile-info__avatar');

popupFullscreen.setEventListeners();
popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupDeleteCard.setEventListeners();
popupAvatar.setEventListeners();

const api = new Api({
  baseUrl: url,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

let currnetUserId = null;

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userElement.setUserInfo(userData);
    userElement.updateAvatar(userData);
    currnetUserId = userData._id;

    cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

/* functions */

function createCard(data) {
  const card = new Card(
    data,
    currnetUserId,
    '.card-template', {
      handleCardClick: (name, link) => popupFullscreen.open(name, link),
      handleLikeClick: () => handleLikeClick(card, data),
      handleCardDelete: () => handleCardDelete(card)
    },
  );
  return card.generateCard(data);
}

function handleLikeClick(card, data) {
  const promise = card.isLiked() ? api.dislikeCard(data._id) : api.likeCard(data._id);
  promise
    .then((data) => {
      card.setLike(data);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
}

function handleCardDelete(card) {
  popupDeleteCard.open();

  popupDeleteCard.setFormSubmitHandler(() => {
    api.deleteCard(card._id)
      .then(() => {
        card.deleteCard();

        popupDeleteCard.close();
      })
      .catch(err => console.log(err))
  })
}

/* обработчик для добавления */
function handleAddFormSubmit(e, data) {
  e.preventDefault();
  popupAdd.loading(true);
  api.createCard(data)
    .then((res) => {
      cardList.addItem(createCard(res));
      popupAdd.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEdit.loading(false))
}

/* обработчик для редактирования */
function handleEditFormSubmit(e, data) {
  e.preventDefault();
  // обновляю данные на сервере
  popupEdit.loading(true);
  api.setUserInfo(data)
    .then((res) => {
      userElement.setUserInfo(res)
      popupEdit.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEdit.loading(false))
}

function handleAvatarFromSubmit(e, data) {
  e.preventDefault();
  popupAvatar.loading(true);
  api.setAvatar(data)
    .then(() => {
      userElement.updateAvatar(data);
      popupAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupEdit.loading(false))
}

function openEditPopup() {
  const userInfo = userElement.getUserInfo();
  inputName.value = userInfo.name;
  inputAbout.value = userInfo.about;

  validatorEdit.updateValidation();
  popupEdit.open();
}

/* events */
btnEdit.addEventListener('click', openEditPopup);
btnAdd.addEventListener('click', () => {
  validatorAdd.updateValidation();
  popupAdd.open();
});
avatarImg.addEventListener('click', () => {
  validatorAvatar.enableValidation();
  popupAvatar.open();
});