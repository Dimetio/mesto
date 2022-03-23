// вроде сделал, как в рекомендациях, только это на пр8 не удовлетворяет тз: 
// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer
export default class Section {
  constructor({
    renderer
  }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.reverse().forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}