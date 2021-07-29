import Car from '../../models/Car';
import { SelectCarFunction } from '../../models/SelectCarFunction';
import TrackService from '../../services/TrackService';
import AppButton from '../../shared/AppButton';
import FlagImg from './FlagImg';

export default class GarageCarDiv {
  private readonly carImgSrc = 'img/car.svg';

  private trackService = new TrackService();

  private readonly garageCarDivClass = 'garage-car-div';

  private readonly carPrefix = 'car-';

  private readonly carGarageManagmentDivClass = 'car-garage';

  private readonly selectButtonText = 'SELECT';

  private readonly removeButtonText = 'REMOVE';

  private readonly buttonClass = 'buttons';

  private readonly selectButtonClass = 'garage-select';

  private readonly removeButtonClass = 'garage-remove';

  private readonly carNameClass = 'car-name';

  private readonly startButtonText = 'A';

  private readonly stopButtonText = 'B';

  private readonly animationButtonClass = 'animation-buttons';

  private readonly startButtonClass = 'start';

  private readonly stopButtonClass = 'stop';

  private readonly coloffulClass = 'colorful-car';

  private readonly lineClass = 'line';

  constructor(private car: Car, private garage: Object,
    private selectFunction: SelectCarFunction,
    private deleteFunction: SelectCarFunction) {
  }

  public draw(): HTMLDivElement {
    const garageCarDiv = document.createElement('div');
    garageCarDiv.classList.add(this.garageCarDivClass);
    garageCarDiv.id = `${this.carPrefix}${this.car.id}`;

    const carGarageManagmentDiv = document.createElement('div');
    carGarageManagmentDiv.classList.add(this.carGarageManagmentDivClass);

    const selectButton = new AppButton('', this.selectButtonText, [this.buttonClass, this.selectButtonClass]).draw();
    const removeButton = new AppButton('', this.removeButtonText, [this.buttonClass, this.removeButtonClass]).draw();
    const carDescription = document.createElement('p');
    carDescription.textContent = this.car.name;
    carDescription.classList.add(this.carNameClass);

    selectButton.addEventListener('click', this.selectCar.bind(this));
    removeButton.addEventListener('click', this.removeCar.bind(this));

    carGarageManagmentDiv.appendChild(selectButton);
    carGarageManagmentDiv.appendChild(removeButton);
    carGarageManagmentDiv.appendChild(carDescription);

    const carAnimationDiv = document.createElement('div');
    const startButton = new AppButton('', this.startButtonText, [this.animationButtonClass, this.startButtonClass]).draw();
    const stopButton = new AppButton('', this.stopButtonText, [this.animationButtonClass, this.stopButtonClass]).draw();
    stopButton.disabled = true;

    startButton.addEventListener('click', this.startCar.bind(this));

    const carDiv = document.createElement('div');
    carDiv.classList.add(this.coloffulClass);
    carDiv.style.backgroundColor = this.car.color;

    const flagDiv = new FlagImg().draw();

    const lineDiv = document.createElement('div');
    lineDiv.classList.add(this.lineClass);

    carAnimationDiv.appendChild(startButton);
    carAnimationDiv.appendChild(stopButton);
    carAnimationDiv.appendChild(carDiv);
    carAnimationDiv.appendChild(flagDiv);
    carAnimationDiv.appendChild(lineDiv);

    garageCarDiv.appendChild(carGarageManagmentDiv);
    garageCarDiv.appendChild(carAnimationDiv);

    return garageCarDiv;
  }

  public selectCar(event : Event) {
    const carId = GarageCarDiv.getCarId(event);
    this.selectFunction.call(this.garage, carId);
  }

  public removeCar(event : Event) {
    const carId = GarageCarDiv.getCarId(event);
    this.deleteFunction.call(this.garage, carId);
  }

  public startCar(event : Event) {
    const carId = GarageCarDiv.getCarId(event);
    this.trackService.start(carId);
  }

  private static getCarId(event: Event) {
    const button = event.target as HTMLButtonElement;
    const buttonParent = button?.parentElement as HTMLDivElement;
    const garageCarDiv = buttonParent?.parentElement as HTMLDivElement;
    const carId = garageCarDiv.id.slice(4);
    return carId;
  }
}
