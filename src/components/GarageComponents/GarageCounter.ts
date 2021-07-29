export default class GarageCounter {
  private carCounterId = 'carCounterId';

  private readonly garageWrapperId = 'garage-wrapper';

  constructor(private counter: number) {
  }

  public draw(): void {
    const garageTitle = document.createElement('h2');
    garageTitle.id = this.carCounterId;
    garageTitle.textContent = `Garage (${this.counter.toString()})`;
    const garageWrapper = document.getElementById(this.garageWrapperId);
    garageWrapper?.appendChild(garageTitle);
  }

  public updateCounter(newCounter: number) {
    const totalCars = document.getElementById(this.carCounterId);
    if (totalCars) {
      totalCars.textContent = `Garage (${newCounter.toString()})`;
    }
  }
}
