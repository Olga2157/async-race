export default class RacerImg {
  private racerImgSrc = 'img/bolid.png';

  private readonly racerClass = 'racer';

  private readonly winnersWrapperId = 'winners-wrapper';

  public draw(): void {
    const racingDiv = document.createElement('div');
    racingDiv.classList.add(this.racerClass);
    const racingImg = document.createElement('img');
    racingImg.src = this.racerImgSrc;
    racingDiv.appendChild(racingImg);
    const garageWrapper = document.getElementById(this.winnersWrapperId);
    garageWrapper?.appendChild(racingDiv);
  }
}
