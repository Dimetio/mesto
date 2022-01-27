(function () {
  //const page = document.querySelector('.page');

  /* popup-edit */
  const popupEdit = document.querySelector('.popup-edit');
  const formEdit = popupEdit.querySelector('.popup__container');
  const inputName = popupEdit.querySelector('.popup__input-name');
  const inputJob = popupEdit.querySelector('.popup__input-job');

  /* popup-add */
  const popupAdd = document.querySelector('.popup-add');
  const formAdd = popupAdd.querySelector('.popup__container');
  const inputTitle = popupAdd.querySelector('.popup__input-title');
  const inputLink = popupAdd.querySelector('.popup__input-link');

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
  const cardTemplate = document.querySelector('#card-template').content;

  const btnEditClose = document.querySelector('.edit-close');
  const btnAddClose = document.querySelector('.add-close');
  const btnFullscreenClose = document.querySelector('.fullscreen-close');

  const initialCards = [{
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  //let isOpened = false; // флаг переключения

  // функция тоглит класс
  const toggleClass = (elem, className) => {
    elem.classList.toggle(className);
    //isOpened = false;
  }

  // тоглит поп-ап
  const togglePopup = (popup) => {
    toggleClass(popup, 'popup_opened');
  }

  // закрывает поп-пана крестик
  const closePopup = (popup) => {
    togglePopup(popup);
  }

  btnEditClose.addEventListener('click', () => {
    closePopup(popupEdit);
  });

  btnAddClose.addEventListener('click', () => {
    closePopup(popupAdd);
  });

  btnFullscreenClose.addEventListener('click', () => {
    closePopup(popupFullscreen);
  });

  /* обработчик для добавления */
  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    const data = {};
    data.name = inputTitle.value;
    data.link = inputLink.value;

    cards.prepend(createCard(data));

    inputTitle.value = '';
    inputLink.value = '';

    togglePopup(popupAdd);
  }

  /* обработчик для редактирования */
  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    infoName.textContent = inputName.value;
    infoJob.textContent = inputJob.value;

    togglePopup(popupEdit);
  }

  // закрывает поп-ап по нажатию на Esc
  /*
  page.addEventListener('keydown', (event) => {
    if (isOpened && event.keyCode === 27) {
       togglePopup(popup);
    }
  });
  */

  btnEdit.addEventListener('click', () => {
    togglePopup(popupEdit);

    inputName.value = infoName.textContent;
    inputJob.value = infoJob.textContent;
    //isOpened = true;
  });

  btnAdd.addEventListener('click', () => {
    togglePopup(popupAdd);
  })

  // закрывает поп-ап по клику вне поп-апа
  /*
  popup.addEventListener('click', (e) => {
    let target = e.target;

    if (target === popup) {
       togglePopup(popup);
    }
  });
  */

  /* 
   * функция создает карточку, и сразу в вешает 3 события клика: лайк, удаление и фулскрин
   */
  const createCard = (item) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const img = cardElement.querySelector('.card__img');
    const title = cardElement.querySelector('.card__title');
    const btnLike = cardElement.querySelector('.card__like');
    const btnTrash = cardElement.querySelector('.card__img-trash');
    const image = cardElement.querySelector('.card__img-overlay');
    const cardImg = cardElement.querySelector('.card__img');
    const cardTitle = cardElement.querySelector('.card__title');

    btnLike.addEventListener('click', () => {
      toggleClass(btnLike, 'card__like_active');
    });

    btnTrash.addEventListener('click', () => {
      cardElement.remove();
    });

    image.addEventListener('click', () => {
      imgFullscreen.src = cardImg.src;

      imgFullscreen.alt = cardTitle.textContent;

      fullscreenTitle.textContent = cardTitle.textContent;

      togglePopup(popupFullscreen);
    });

    img.src = item.link;
    img.alt = item.name;
    title.textContent = item.name;

    return cardElement;
  }

  /* создает карточки */
  const renderCards = () => {
    if (initialCards) {
      initialCards.forEach((el) => {
        cards.append(createCard(el));
      });
    }
  }

  renderCards();

  formEdit.addEventListener('submit', handleEditFormSubmit);
  formAdd.addEventListener('submit', handleAddFormSubmit);
}());