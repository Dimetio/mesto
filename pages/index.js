(function () {
  const popup = document.querySelector('.popup'); // поп-ап
  const form = popup.querySelector('.popup__container'); // форма
  const inputName = popup.querySelector('.popup__input-name'); // инпут с именем
  const inputJob = popup.querySelector('.popup__input-job'); // инпус с деятельностью
  const infoName = document.querySelector('.profile-info__name');
  const infoJob = document.querySelector('.profile-info__job');

  const btnClose = popup.querySelector('.popup__btn-close');
  const btnEdit = document.querySelector('.profile-info__edit'); // кнопка редактирования профиля

  let opened = false; // флаг переключения

  document.addEventListener('keydown', (event) => {
    if (opened && event.keyCode === 27) {
      toggleClass(popup, 'popup_opened');
    }
  });

  const toggleClass = (elem, className) => {
    elem.classList.toggle(className);

    opened ? opened = !opened : opened = !opened; // переключаение флага

    // if (opened) {
    //   opened = !opened;
    // } else {
    //   opened = !opened;
    // }
  }

  btnClose.addEventListener('click', () => {
    toggleClass(popup, 'popup_opened');
  })

  btnEdit.addEventListener('click', () => {
    //popup.classList.add('popup_opened');
    toggleClass(popup, 'popup_opened');

    inputName.value = infoName.textContent;
    inputJob.value = infoJob.textContent;
  });

  popup.addEventListener('click', (e) => {
    let target = e.target;

    if (target === popup) {
      toggleClass(popup, 'popup_opened');
    }
  })

  const formSubmitHandler = (e) => {
    e.preventDefault();

    infoName.textContent = inputName.value;
    infoJob.textContent = inputJob.value;

    //popup.classList.remove('popup_opened');
    toggleClass(popup, 'popup_opened');
  }

  form.addEventListener('submit', formSubmitHandler)
}());