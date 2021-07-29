import Car from '../models/Car';

export default class CarGeneration {
  private brands = ['Ford', 'Mersedes', 'Ferrary', 'BMV', 'Audi', 'Hyundai', 'AlfaRomeo', 'Volkswagen', 'Tesla', 'Volvo'];

  private models = ['Focus', 'Fiesta', 'Passat', 'Model X', 'Model S', 'Benz', 'X5', 'Cruze', 'S3', 'Solaris'];

  private colors = ['rgb(255, 0, 0)', 'rgb(255, 255, 0)', 'rgb(0, 0, 0)', 'rgb(133, 133, 133)', 'rgb(0, 0, 255)', 'rgb(255,192,203)', 'rgb(0,255,0)', 'rgb(150, 75, 0)', 'rgb(255, 165, 0)', 'rgb(138,43,226)'];

  private readonly carsNumber = 100;

  public generate() : Car[] {
    const generatedCars = [];
    for (let i = 0; i < this.carsNumber; i += 1) {
      const brandRandomIndex = Math.floor((Math.random() * 10));
      const modelRandomIndex = Math.floor((Math.random() * 10));
      const colorRandomIndex = Math.floor((Math.random() * 10));
      generatedCars.push(new Car(`${this.brands[brandRandomIndex]} ${this.models[modelRandomIndex]}`, this.colors[colorRandomIndex]));
    }
    return generatedCars;
  }
}
