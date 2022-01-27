(function () {
  //const page = document.querySelector('.page'); // body

  /* popup-edit */
  const popupEdit = document.querySelector('.popup-edit'); // поп-ап редактирования
  const formEdit = popupEdit.querySelector('.popup__container'); // форма редактирования
  const inputName = popupEdit.querySelector('.popup__input-name'); // инпут с именем
  const inputJob = popupEdit.querySelector('.popup__input-job'); // инпус с деятельностью

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
  const infoName = document.querySelector('.profile-info__name'); // поле с именем
  const infoJob = document.querySelector('.profile-info__job'); // поле с деятельностью  
  const btnEdit = document.querySelector('.profile-info__edit'); // кнопка редактирования
  const btnAdd = document.querySelector('.profile__add');

  const cards = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card-template').content; //шаблон карточки

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

  /* обработчик для добавления */
  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    const data = {};
    data.name = inputTitle.value;
    data.link = inputLink.value;

    initialCards.unshift(data);

    renderCards();

    inputTitle.value = '';
    inputLink.value = '';

    toggleClass(popupAdd, 'popup_opened');
  }

  /* обработчик для редактирования */
  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    infoName.textContent = inputName.value;
    infoJob.textContent = inputJob.value;

    toggleClass(popupEdit, 'popup_opened');
    closePopupOnCross(popupEdit);
  }

  // закрыть поп-ап по нажатию на Esc
  /*
  page.addEventListener('keydown', (event) => {
    if (isOpened && event.keyCode === 27) {
      toggleClass(popupEdit, 'popup_opened');
    }
  });
  */

  // закрывает поп-ап на крестик
  const closePopupOnCross = (popup) => {
    const btnClose = popup.querySelector('.popup__btn-close');

    btnClose.addEventListener('click', foo);

    /* 
      я хз как ее лучше назвать, она нужна, чтобы снять ивент, 
      а то будет при повторном клике будет два события висеть
    */
    function foo() {
      toggleClass(popup, 'popup_opened');
      btnClose.removeEventListener('click', foo);
    }
  }

  btnEdit.addEventListener('click', () => {
    toggleClass(popupEdit, 'popup_opened');

    inputName.value = infoName.textContent;
    inputJob.value = infoJob.textContent;

    closePopupOnCross(popupEdit);

    //isOpened = true;
  });

  btnAdd.addEventListener('click', () => {
    toggleClass(popupAdd, 'popup_opened');

    closePopupOnCross(popupAdd);
  })

  // закрываю поп-ап по клику вне поп-апа
  /*
  popup.addEventListener('click', (e) => {
    let target = e.target;

    if (target === popup) {
      toggleClass(popupEdit, 'popup_opened');
      toggleClass(page, 'popup-visible');
    }
  });
  */

  /* открывает поп-ап с картиной по клику на картинку */
  const openFullImg = () => {
    const images = document.querySelectorAll('.card__img-overlay');

    images.forEach((el) => {
      const parentElement = el.closest('.card');
      const cardImg = parentElement.querySelector('.card__img');
      const cardTitle = parentElement.querySelector('.card__title');

      el.addEventListener('click', () => {
        imgFullscreen.src = cardImg.src;
        fullscreenTitle.textContent = cardTitle.textContent;

        toggleClass(popupFullscreen, 'popup_opened');

        closePopupOnCross(popupFullscreen);
      });
    });
  }

  /* удаление карточки */
  const deleteCard = () => {
    const btnTrash = document.querySelectorAll('.card__img-trash');

    btnTrash.forEach((el, index) => {
      el.addEventListener('click', () => {
        const cardElement = el.closest('.card');
        cardElement.remove();

        initialCards.splice(index, 1);

        renderCards();
      });
    });
  }

  /* лайк карточек */
  const likeCard = () => {
    const btnLike = document.querySelectorAll('.card__like');

    btnLike.forEach((el) => {
      el.addEventListener('click', () => {
        toggleClass(el, 'card__like_active');
      });
    });
  }

  /* создает карточки */
  const renderCards = () => {
    //cards.innerHTML= '';
    while (cards.firstChild) {
      cards.removeChild(cards.firstChild);
    }

    if (initialCards) {
      initialCards.forEach(el => {
        const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
        const img = cardElement.querySelector('.card__img');
        const title = cardElement.querySelector('.card__title');

        img.src = el.link;
        title.textContent = el.name;

        cards.append(cardElement);
      });
    }

    likeCard();
    deleteCard();
    openFullImg();
  }

  renderCards();

  formEdit.addEventListener('submit', handleEditFormSubmit);
  formAdd.addEventListener('submit', handleAddFormSubmit);
}());