import Car from '../../models/Car';
import { CarFunction } from '../../models/CarFunction';

export default class CreateUpdateDiv {
  private colorValue = '#e66465';

  private readonly createUpdateClass = 'input-div';

  private readonly textType = 'text';

  private readonly colorType = 'color';

  private readonly submitType = 'submit';

  private readonly inputClass = 'form-input';

  private readonly submitClass = 'form-submit';

  constructor(
    private inputTypeValue: string,
    private inputNameId: string,
    private inputColorId: string,
    public carFunction: CarFunction,
    public garage: Object,
    public isUpdate: boolean = false,
  ) {
  }

  public draw(): HTMLDivElement {
    const inputDiv = document.createElement('div');
    inputDiv.classList.add(this.createUpdateClass);

    const inputFirst = document.createElement('input');
    inputFirst.type = this.textType;
    inputFirst.value = '';
    inputFirst.id = this.inputNameId;
    inputFirst.classList.add(this.inputClass);
    inputFirst.disabled = this.isUpdate;

    const inputSecond = document.createElement('input');
    inputSecond.type = this.colorType;
    inputSecond.value = this.colorValue;
    inputSecond.id = this.inputColorId;
    inputSecond.disabled = this.isUpdate;

    const inputThird = document.createElement('input');
    inputThird.type = this.submitType;
    inputThird.value = this.inputTypeValue;
    inputThird.disabled = this.isUpdate;
    inputThird.classList.add(this.submitClass);

    inputDiv.appendChild(inputFirst);
    inputDiv.appendChild(inputSecond);
    inputDiv.appendChild(inputThird);

    if (this.isUpdate) {
      inputThird.addEventListener('click', this.updateCar.bind(this));
    } else {
      inputThird.addEventListener('click', this.createCar.bind(this));
    }

    return inputDiv;
  }

  private updateCar() {
    const nameInput = document.getElementById(this.inputNameId) as HTMLInputElement;
    const colorInput = document.getElementById(this.inputColorId) as HTMLInputElement;
    this.carFunction.call(this.garage, new Car(nameInput.value, colorInput.value));
    nameInput.disabled = true;
    colorInput.disabled = true;
    nameInput.value = '';
    colorInput.value = this.colorValue;
    const submitButton = document.querySelectorAll(`.${this.submitClass}`)[1] as HTMLInputElement;
    submitButton.disabled = true;
  }

  private createCar() {
    const nameInput = document.getElementById(this.inputNameId) as HTMLInputElement;
    const colorInput = document.getElementById(this.inputColorId) as HTMLInputElement;
    this.carFunction.call(this.garage, new Car(nameInput.value, colorInput.value));
    nameInput.value = '';
    colorInput.value = this.colorValue;
  }

  public updateSelectedCar(car : Car) {
    const nameInput = document.getElementById(this.inputNameId) as HTMLInputElement;
    const colorInput = document.getElementById(this.inputColorId) as HTMLInputElement;
    nameInput.value = car.name;
    colorInput.value = car.color;
    nameInput.disabled = false;
    colorInput.disabled = false;
    document.querySelectorAll(`.${this.submitClass}`).forEach((el) => {
      const inputEl = el as HTMLInputElement;
      inputEl.disabled = false;
    });
  }
}
