export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userAbout = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  updateAvatar(data) {
    this._avatar.style.backgroundImage = `url(${data.avatar})`;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    }
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }
}