export default class AppButton {
  constructor(private buttonId: string,
    private buttonText: string,
    private buttonClasses: string[]) {
  }

  public draw(): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = this.buttonId;
    button.textContent = this.buttonText;
    button.classList.add(...this.buttonClasses);
    return button;
  }
}
