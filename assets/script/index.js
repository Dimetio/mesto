import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [{
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

const page = document.querySelector('.page');
/* popup-edit */
const popupEdit = document.querySelector('.popup-edit');
const formWrapEdit = popupEdit.querySelector('.popup__container');
const formEdit = popupEdit.querySelector('.popup__form');
const inputName = popupEdit.querySelector('.popup__input_name');
const inputJob = popupEdit.querySelector('.popup__input_job');
/* popup-add */
const popupAdd = document.querySelector('.popup-add');
const formWrapAdd = popupAdd.querySelector('.popup__container');
const formAdd = popupAdd.querySelector('.popup__form');
const inputTitle = popupAdd.querySelector('.popup__input_title');
const inputLink = popupAdd.querySelector('.popup__input_link');
/* popup-fullscreen */
const popupFullscreen = document.querySelector('.popup-fullscreen');
const imgFullscreen = popupFullscreen.querySelector('.popup-fullscreen__img');
const fullscreenTitle = popupFullscreen.querySelector('.popup-fullscreen__title');
/* profile */
const infoName = document.querySelector('.profile-info__name');
const infoJob = document.querySelector('.profile-info__job')
const btnEdit = document.querySelector('.profile-info__edit');
const btnAdd = document.querySelector('.profile__add');
const cards = document.querySelector('.cards');
/* forms */


const formParams = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};

const validatorAdd = new FormValidator(formParams, formAdd); // инстанс класса
validatorAdd.enableValidation();

const validatorEdit = new FormValidator(formParams, formEdit);
validatorEdit.enableValidation();

/* functions */

/* навешивает слушатели внутри поп-апа */
function addPopupListeners(popup) {
  const buttonClosePopup = popup.querySelector('.popup__btn-close');
  buttonClosePopup.addEventListener('click', handleButtonClosePopup);
  popup.addEventListener('click', handlePopupClick);
  page.addEventListener('keydown', handlePopupEscPress);
}

function openPopup(popup) {
  addPopupListeners(popup);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

const handleButtonClosePopup = (e) => {
  const popup = e.target.closest('.popup');
  closePopup(popup);
}

// закрывает поп-ап по клику на фон
const handlePopupClick = (e) => {
  if (e.target === e.currentTarget)
    closePopup(e.target);
}

// закрывает поп-ап на Esc
const handlePopupEscPress = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

/* обработчик для добавления */
const handleAddFormSubmit = (e) => {
  e.preventDefault();
  const data = {
    name: inputTitle.value,
    link: inputLink.value,
  };
  addCard(data);
  e.target.reset(); // чищу форму
  closePopup(popupAdd);
  const buttonElement = popupAdd.querySelector('.popup__submit');
  buttonElement.classList.add('popup__submit_inactive');
}

/* обработчик для редактирования */
const handleEditFormSubmit = (e) => {
  e.preventDefault();
  infoName.textContent = inputName.value;
  infoJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

function openFullscreenPopup(e) {
  const card = e.target.closest('.card');
  const cardImg = card.querySelector('.card__img');
  const cardTitle = card.querySelector('.card__title');
  imgFullscreen.src = cardImg.src;
  imgFullscreen.alt = cardTitle.textContent;
  fullscreenTitle.textContent = cardTitle.textContent;
  openPopup(popupFullscreen);
}

function addCard(data) {
  const card = createCard(data);
  cards.prepend(card);
}

function openEditPopup(popup) {
  inputName.value = infoName.textContent;
  inputJob.value = infoJob.textContent;
  openPopup(popup);

  const formElement = popup.querySelector('.popup__form');
  validatorEdit.updateValidation(formElement);
}

function openAddPopup(popup) {
  openPopup(popup);
}

function renderCards() {
  cards.innerHTML = '';
  initialCards.forEach((item) => {
    const card = new Card(item, '.card-template', openFullscreenPopup);
    const cardElement = card.generateCard();
    cards.append(cardElement);
  });
}

/* events */
btnEdit.addEventListener('click', () => openEditPopup(popupEdit));
btnAdd.addEventListener('click', () => openAddPopup(popupAdd));
formWrapEdit.addEventListener('submit', handleEditFormSubmit);
formWrapAdd.addEventListener('submit', handleAddFormSubmit);

/* init */
renderCards();