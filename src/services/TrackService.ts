import DistanceDetails from '../models/DistanceDetails';
import APIService from './APIService';
import DriveService from './DriveService';
import UtilityUIService from './UtilityUIService';

export default class TrackService {
  private api: APIService;

  private driveService: DriveService;

  private readonly distance = 80;

  private readonly updateTime = 25;

  private readonly finalStep = 3;

  private readonly startButtonClass = '.start';

  private readonly stopButtonClass = '.stop';

  constructor() {
    this.api = new APIService();
    this.driveService = new DriveService();
  }

  public start(carId : string, raceMode : boolean = false) : Promise<number> {
    return new Promise<number>((resolve) => {
      this.driveService.disableDriveButton(carId, this.startButtonClass);
      this.api.startEngine<DistanceDetails>(carId).then((distanceDetails : DistanceDetails) => {
        const driveTime = Math.floor(Number(distanceDetails.distance)
        / Number(distanceDetails.velocity));
        const stepsCount = driveTime / this.updateTime;
        const step = this.distance / stepsCount;
        const driveTimer = setInterval(() => this.driveService
          .moveCar(carId, step), this.updateTime);
        if (!raceMode) {
          this.driveService.enableDriveButton(carId, this.stopButtonClass, driveTimer);
        }
        this.driveService.addResetHahdler(driveTimer);
        this.api.drive(carId).then((response) => {
          if (response.ok) {
            clearInterval(driveTimer);
            if (!UtilityUIService.isRaceOver()) {
              this.driveService.moveCar(carId, this.finalStep);
            }
            resolve(driveTime);
          } else {
            clearInterval(driveTimer);
            resolve(-1);
          }
        });
      });
    });
  }
}
