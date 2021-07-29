export default class WinnerDiv {
  private readonly winnerDivClass = 'winners-div';

  private readonly winnerPositionClass = 'winners-position';

  private readonly classForMedal = 'medal';

  private readonly goldMedalClass = 'medal-first';

  private readonly silverMedalClass = 'medal-second';

  private readonly bronzeMedalClass = 'medal-third';

  private readonly colorfulClass = 'colorful-car';

  private readonly winnerNameClass = 'winners-name';

  private readonly winsCounterClass = 'wins-counter';

  private readonly sortClass = 'sort';

  private readonly bestTimeClass = 'winners-best-time';

  constructor(
    public place: number,
    public winnerCarColor: string,
    public winnerName: string,
    public winnerWins: number,
    public bestTime: number,
  ) {
  }

  public draw(): HTMLDivElement {
    const winnerDiv = document.createElement('div');
    winnerDiv.classList.add(this.winnerDivClass);

    const winnerPosition = document.createElement('p');
    winnerPosition.classList.add(this.winnerPositionClass);
    winnerPosition.classList.add(this.classForMedal);
    let medalClass = '';
    switch (this.place) {
      case 1: medalClass = this.goldMedalClass;
        break;
      case 2: medalClass = this.silverMedalClass;
        break;
      case 3: medalClass = this.bronzeMedalClass;
        break;
      default: medalClass = '';
    }
    if (medalClass) {
      winnerPosition.classList.add(medalClass);
    }
    winnerPosition.textContent = this.place.toString();

    const winnerCarImgDiv = document.createElement('div');
    winnerCarImgDiv.classList.add(this.colorfulClass);
    winnerCarImgDiv.style.backgroundColor = this.winnerCarColor;

    const winnerName = document.createElement('p');
    winnerName.classList.add(this.winnerNameClass);
    winnerName.textContent = this.winnerName;

    const winnerWins = document.createElement('p');
    winnerWins.classList.add(this.winsCounterClass);
    winnerWins.textContent = this.winnerWins.toString();

    const winnerTimeDiv = document.createElement('div');
    winnerTimeDiv.classList.add(this.sortClass);

    const winnerBestTime = document.createElement('p');
    winnerBestTime.classList.add(this.bestTimeClass);
    winnerBestTime.textContent = this.bestTime.toString();

    winnerDiv.appendChild(winnerPosition);
    winnerDiv.appendChild(winnerCarImgDiv);
    winnerDiv.appendChild(winnerName);
    winnerDiv.appendChild(winnerWins);
    winnerDiv.appendChild(winnerBestTime);

    return winnerDiv;
  }
}
