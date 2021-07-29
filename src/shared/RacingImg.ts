export default class RacingImg {
  private racingImgSrc = 'img/racing.png';

  private readonly racingClass = 'racing';

  constructor(
    public wrapperId: string,
  ) {
  }

  public draw(): void {
    const racingDiv = document.createElement('div');
    racingDiv.classList.add(this.racingClass);
    const racingImg = document.createElement('img');
    racingImg.src = this.racingImgSrc;
    racingDiv.appendChild(racingImg);
    const garageWrapper = document.getElementById(this.wrapperId);
    garageWrapper?.appendChild(racingDiv);
  }
}
