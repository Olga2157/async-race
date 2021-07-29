import Car from '../models/Car';
import GarageWrapper from '../components/GarageComponents/GarageWrapper';
import APIService from './APIService';
import CarGeneration from './CarGeneration';

export default class Garage {
  private cars : Car[];

  private currentPage;

  private api;

  private garageWrapper : GarageWrapper;

  private selectedCarId : string;

  private carGenerationService : CarGeneration;

  private readonly nameOfNewCar = 'new car';

  private readonly defaultCarId = '-1';

  constructor() {
    this.cars = [];
    this.currentPage = 1;
    this.api = new APIService();
    this.garageWrapper = new GarageWrapper(this.currentPage, this.addCar,
      this.updateCar, this.selectCar,
      this.deleteCar, this.generateCars,
      this.prevPage, this.nextPage,
      this);
    this.selectedCarId = this.defaultCarId;
    this.carGenerationService = new CarGeneration();
  }

  public async init() {
    await this.api.getCars<Car>().then(async (cars) => {
      this.cars = cars;
      this.garageWrapper.draw(this.cars);
    });
  }

  public addCar(carParam : Car): void {
    const newCar = carParam;
    if (!newCar.name) {
      newCar.name = this.nameOfNewCar;
    }
    this.api.createCar(newCar).then((createdCar) => {
      this.cars.push(createdCar);
      this.garageWrapper.updateCars(this.cars, this.currentPage);
    });
  }

  public updateCar(updatedCar : Car): void {
    const selectedCar = this.cars.filter((c) => c.id?.toString() === this.selectedCarId)[0];
    selectedCar.name = updatedCar.name;
    selectedCar.color = updatedCar.color;
    this.garageWrapper.updateCars(this.cars, this.currentPage);
    this.api.updateCar(selectedCar);
  }

  public deleteCar(deletedCarId : string): void {
    this.cars.splice(this.cars.findIndex((car) => car.id?.toString() === deletedCarId), 1);
    this.api.deleteCar(deletedCarId);
    this.api.getWinner(deletedCarId).then((winnerForDeletedCar) => {
      if (winnerForDeletedCar.id !== Number(this.defaultCarId)) {
        this.api.deleteWinner(deletedCarId);
      }
    });
    this.garageWrapper.updateCars(this.cars, this.currentPage);
  }

  public selectCar(id: string): void {
    this.selectedCarId = id;
    const selectedCar = this.cars.filter((c) => c.id?.toString() === this.selectedCarId)[0];
    this.garageWrapper.selectCar(selectedCar);
  }

  public prevPage(): void {
    this.currentPage -= 1;
    this.garageWrapper.updateCars(this.cars, this.currentPage);
  }

  public nextPage(): void {
    this.currentPage += 1;
    this.garageWrapper.updateCars(this.cars, this.currentPage);
  }

  public generateCars() {
    const generatedCars = this.carGenerationService.generate();
    const createdPromises = [];
    for (let i = 0; i < generatedCars.length; i += 1) {
      const createdPromise = this.api.createCar(generatedCars[i]);
      createdPromises.push(createdPromise);
      createdPromise.then((savedCar) => {
        this.cars.push(savedCar);
      });
    }
    Promise.all(createdPromises).then(() => {
      this.garageWrapper.updateCars(this.cars, this.currentPage);
    });
  }
}
