import GarageSettings from './GarageSettings';
import GarageCounter from './GarageCounter';
import GaragePageCounter from './GaragePageCounter';
import RacingImg from '../../shared/RacingImg';
import RacingRoadImg from './RacingRoadImg';
import GarageCarDiv from './GarageCarDiv';
import Car from '../../models/Car';
import PageManager from '../../shared/PageManager';
import { CarFunction } from '../../models/CarFunction';
import { SelectCarFunction } from '../../models/SelectCarFunction';
import { VoidFunction } from '../../models/VoidFunction';

export default class GarageWrapper {
  private garageSettings: GarageSettings;

  private counter: GarageCounter;

  private pageManager: PageManager;

  private garagePageCounter: GaragePageCounter;

  private readonly pageLimit = 7;

  private readonly garageWrapperId = 'garage-wrapper';

  private readonly garageManagementPageId = 'garage-management';

  private readonly garageSectionId = 'garage-section';

  private readonly garageSectionClass = 'garage';

  private readonly transformImgClass = 'race-road-down';

  constructor(
    private pageCounter: number,
    public createFunction: CarFunction,
    public updateFunction: CarFunction,
    public selectFunction: SelectCarFunction,
    public deleteFucntion: SelectCarFunction,
    public generateFunction: VoidFunction,
    public prevPageFunction: VoidFunction,
    public nextPageFunction: VoidFunction,
    public garage: Object,
  ) {
    this.counter = new GarageCounter(0);
    this.garagePageCounter = new GaragePageCounter(0);
    this.pageManager = new PageManager(this.garageWrapperId, this.garageManagementPageId,
      this.garage, this.prevPageFunction, this.nextPageFunction);
    this.garageSettings = new GarageSettings(this.createFunction,
      this.updateFunction, this.generateFunction, this.garage);
  }

  public async draw(cars: Car[]): Promise<void> {
    const garageWrapper = document.createElement('div');
    garageWrapper.id = this.garageWrapperId;
    document.body.appendChild(garageWrapper);
    this.garageSettings.draw();
    new RacingImg(this.garageWrapperId).draw();
    this.counter = new GarageCounter(cars.length);
    this.counter.draw();
    this.garagePageCounter = new GaragePageCounter(this.pageCounter);
    this.garagePageCounter.draw();
    new RacingRoadImg('').draw();
    const garageSection = document.createElement('section');
    garageSection.id = this.garageSectionId;
    garageSection.classList.add(this.garageSectionClass);
    garageWrapper.appendChild(garageSection);
    for (let i = 0; i < this.pageLimit; i += 1) {
      if (i >= cars.length) {
        break;
      }
      const carDiv = new GarageCarDiv(cars[i], this.garage,
        this.selectFunction, this.deleteFucntion).draw();
      garageSection?.appendChild(carDiv);
    }
    new RacingRoadImg(this.transformImgClass).draw();
    this.pageManager.draw();
    this.pageManager.togglePrev();
    if (cars.length <= this.pageLimit) {
      this.pageManager.toggleNext();
    }
  }

  public updateCars(cars: Car[], pageCounter: number): void {
    this.pageCounter = pageCounter;
    const garageSection = document.getElementById(this.garageSectionId);
    // remove all carsdiv
    while (garageSection?.firstChild) {
      garageSection?.firstChild.remove();
    }
    for (let i = (this.pageCounter - 1) * this.pageLimit;
      i < (this.pageCounter) * this.pageLimit; i += 1) {
      if (i >= cars.length) {
        break;
      }
      const carDiv = new GarageCarDiv(cars[i], this.garage,
        this.selectFunction, this.deleteFucntion).draw();
      garageSection?.appendChild(carDiv);
    }
    this.counter.updateCounter(cars.length);
    this.garagePageCounter.updatePageCounter(this.pageCounter);
    if (pageCounter === 1) {
      this.pageManager.togglePrev();
    } else if (pageCounter > 1) {
      this.pageManager.togglePrev(false);
    }
    if (cars.length > pageCounter * this.pageLimit) {
      this.pageManager.toggleNext(false);
    } else {
      this.pageManager.toggleNext();
    }
  }

  public selectCar(car: Car): void {
    this.garageSettings.updateSelectedCar(car);
  }
}
