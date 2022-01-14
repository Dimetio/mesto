(function () {
  const page = document.querySelector('.page'); // body
  const popup = document.querySelector('.popup'); // поп-ап
  const form = popup.querySelector('.popup__container'); // форма
  const inputName = popup.querySelector('.popup__input-name'); // инпут с именем
  const inputJob = popup.querySelector('.popup__input-job'); // инпус с деятельностью
  const infoName = document.querySelector('.profile-info__name'); // поле с именем
  const infoJob = document.querySelector('.profile-info__job'); // поле с деятельностью

  const btnClose = popup.querySelector('.popup__btn-close'); // крестик
  const btnEdit = document.querySelector('.profile-info__edit'); // кнопка редактирования

  let isOpened = false; // флаг переключения

  // закрыть поп-ап по нажатию на Esc
  page.addEventListener('keydown', (event) => {
    if (isOpened && event.keyCode === 27) {
      toggleClass(popup, 'popup_opened');
      toggleClass(page, 'popup-visible');
    }
  });

  // функция тоглит класс
  const toggleClass = (elem, className) => {
    elem.classList.toggle(className);
    isOpened = false;
  }

  btnClose.addEventListener('click', () => {
    toggleClass(popup, 'popup_opened');
    toggleClass(page, 'popup-visible');
  })

  btnEdit.addEventListener('click', () => {
    //popup.classList.add('popup_opened');
    toggleClass(popup, 'popup_opened');
    toggleClass(page, 'popup-visible');

    inputName.value = infoName.textContent;
    inputJob.value = infoJob.textContent;

    isOpened = true;
  });

  // закрываю поп-ап по клику вне поп-апа
  popup.addEventListener('click', (e) => {
    let target = e.target;

    if (target === popup) {
      toggleClass(popup, 'popup_opened');
      toggleClass(page, 'popup-visible');
    }
  })

  const formSubmitHandler = (e) => {
    e.preventDefault();

    infoName.textContent = inputName.value;
    infoJob.textContent = inputJob.value;

    //popup.classList.remove('popup_opened');
    toggleClass(popup, 'popup_opened');
    toggleClass(page, 'popup-visible');
  }

  form.addEventListener('submit', formSubmitHandler)
}());