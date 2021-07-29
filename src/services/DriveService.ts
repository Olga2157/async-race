export default class DriveService {
  private readonly colorFullClass = '.colorful-car';

  private readonly carPrefix = 'car-';

  private readonly congratPopup = 'congrat-popup';

  private readonly marginLeftStartPosition = '2%';

  private readonly marginLeftLimit = 82.9;

  public moveCar(carId : string, distanceStep : number) {
    const carDiv = document.getElementById(`${this.carPrefix}${carId}`);
    const carImgDiv = carDiv?.querySelector(this.colorFullClass) as HTMLDivElement;
    if (carImgDiv) {
      const curMarginLeft = carImgDiv.style.marginLeft;
      if (!curMarginLeft) {
        carImgDiv.style.marginLeft = `${distanceStep}%`;
      } else {
        const marginLeftVal = Number(curMarginLeft.slice(0, -1));
        if (marginLeftVal <= this.marginLeftLimit) {
          const updatedMargin = marginLeftVal + distanceStep;
          carImgDiv.style.marginLeft = `${updatedMargin}%`;
        }
      }
    }
  }

  public disableDriveButton(carId : string, buttonClass : string) {
    const carDiv = document.getElementById(`${this.carPrefix}${carId}`);
    const startButton = carDiv?.querySelector(buttonClass) as HTMLButtonElement;
    startButton.disabled = true;
  }

  public enableDriveButton(carId : string, buttonClass : string,
    driverTimer?: ReturnType<typeof setTimeout>) {
    const carDiv = document.getElementById(`${this.carPrefix}${carId}`);
    const startButton = carDiv?.querySelector(buttonClass) as HTMLButtonElement;
    startButton.disabled = false;
    if (driverTimer) {
      this.addStopHandler(carId, driverTimer);
    }
  }

  public addStopHandler(carId : string, driverTimer: ReturnType<typeof setTimeout>) {
    const carDiv = document.getElementById(`${this.carPrefix}${carId}`);
    const startButton = carDiv?.querySelector('.stop') as HTMLButtonElement;
    startButton.addEventListener('click', () => {
      clearInterval(driverTimer);
      this.enableDriveButton(carId, '.start');
      this.disableDriveButton(carId, '.stop');
      const carImgDiv = carDiv?.querySelector('.colorful-car') as HTMLDivElement;
      carImgDiv.style.marginLeft = this.marginLeftStartPosition;
    });
  }

  addResetHahdler(driverTimer: ReturnType<typeof setTimeout>) {
    document.getElementById('reset')?.addEventListener('click', () => {
      clearInterval(driverTimer);
      document.getElementById(this.congratPopup)?.remove();
      const buttonReset = document.getElementById('reset') as HTMLButtonElement;
      buttonReset.disabled = true;
      const cars = document.querySelectorAll('.garage-car-div .colorful-car');// as HTMLDivElement[];
      cars.forEach((car) => {
        const carDiv = car as HTMLDivElement;
        carDiv.style.marginLeft = this.marginLeftStartPosition;
      });
      setTimeout(() => {
        const buttonRace = document.getElementById('race') as HTMLButtonElement;
        buttonRace.disabled = false;
        const animationButtons = document.querySelectorAll('.start');
        animationButtons.forEach((button) => {
          const animationButton = button as HTMLButtonElement;
          animationButton.disabled = false;
        });
      }, 2000);
    });
  }
}
