import { VoidFunction } from '../models/VoidFunction';

export default class NavButton {
  private readonly navButtonsClass = 'main-buttons';

  private readonly navClass = '.main-pages';

  constructor(public textButton: string,
    public handler: VoidFunction,
    public obj: Object) {
  }

  public init(): void {
    const button = document.createElement('button');
    button.classList.add(this.navButtonsClass);
    const buttonText = document.createTextNode(this.textButton);
    button.appendChild(buttonText);

    const nav = document.querySelector(this.navClass);
    nav?.appendChild(button);

    button.addEventListener('click', () => {
      this.handler.call(this.obj);
    });
  }
}
