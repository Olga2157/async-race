import Car from '../../models/Car';
import { CarFunction } from '../../models/CarFunction';
import { VoidFunction } from '../../models/VoidFunction';
import APIService from '../../services/APIService';
import RaceService from '../../services/RaceService';
import UtilityUIService from '../../services/UtilityUIService';
import GarageButton from '../../shared/AppButton';
import CreateUpdateDiv from './CreateUpdateDiv';

export default class GarageSettings {
  private createDiv: CreateUpdateDiv;

  private updateDiv: CreateUpdateDiv;

  private raceService: RaceService;

  private apiService: APIService;

  private readonly garageSettingsClass = 'garage-settings';

  private readonly garageWrapperId = 'garage-wrapper';

  private readonly raceButtonId = 'race';

  private readonly resetButtonId = 'reset';

  constructor(
    public createFunction: CarFunction,
    public updateFunction: CarFunction,
    public generateFunction: VoidFunction,
    public garage: Object,
  ) {
    this.createDiv = new CreateUpdateDiv('CREATE', 'name-car', 'color-car', this.createFunction, this.garage);
    this.updateDiv = new CreateUpdateDiv('UPDATE', 'new-name-car', 'new-color-car', this.updateFunction, this.garage, true);
    this.raceService = new RaceService();
    this.apiService = new APIService();
  }

  public draw(): void {
    const garageSettingsSection = document.createElement('section');
    garageSettingsSection.classList.add(this.garageSettingsClass);

    const garageButtons = document.createElement('div');
    const raceButton = new GarageButton('race', 'RACE', ['buttons']).draw();
    const resetButton = new GarageButton('reset', 'RESET', ['buttons']).draw();
    const generateCarsButton = new GarageButton('generate-cars', 'GENERATE CARS', ['buttons']).draw();
    garageButtons.appendChild(raceButton);
    garageButtons.appendChild(resetButton);
    garageButtons.appendChild(generateCarsButton);
    generateCarsButton.addEventListener('click', this.generateRandomCars.bind(this));
    raceButton.addEventListener('click', this.race.bind(this));
    resetButton.disabled = true;

    garageSettingsSection.appendChild(this.createDiv.draw());
    garageSettingsSection.appendChild(this.updateDiv.draw());
    garageSettingsSection.appendChild(garageButtons);

    const garageWrapper = document.getElementById(this.garageWrapperId);
    garageWrapper?.appendChild(garageSettingsSection);
  }

  generateRandomCars() {
    this.generateFunction.call(this.garage);
  }

  public updateSelectedCar(car : Car) {
    this.updateDiv.updateSelectedCar(car);
  }

  public race() {
    const buttonRace = document.getElementById(this.raceButtonId) as HTMLButtonElement;
    buttonRace.disabled = true;
    const buttonReset = document.getElementById(this.resetButtonId) as HTMLButtonElement;
    buttonReset.disabled = false;
    this.raceService.startRace(UtilityUIService.getCarIds());
  }
}
