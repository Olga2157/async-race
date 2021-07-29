export default class RacingRoadImg {
  private readonly racingRoadClass = 'race-road';

  private readonly garageWrapperId = 'garage-wrapper';

  constructor(private transformClass: string) {
  }

  public draw(): void {
    const racingRoadDiv = document.createElement('div');
    racingRoadDiv.classList.add(this.racingRoadClass);
    if (this.transformClass) {
      racingRoadDiv.classList.add(this.transformClass);
    }

    const garageWrapper = document.getElementById(this.garageWrapperId);
    garageWrapper?.appendChild(racingRoadDiv);
  }
}
