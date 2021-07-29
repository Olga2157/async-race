import WinnerSortDiv from './WinnerSortDiv';

export default class WinnersTitleDiv {
  constructor(
    public obj: Object,
    public changeWinsOrder: VoidFunction,
    public changeTimeOrder: VoidFunction,
  ) {
  }

  private readonly winnersSectionId = 'winners-section';

  private readonly winnersDivClass = 'winners-div';

  private readonly winnersPositionClass = 'winners-position';

  private readonly classWithoutMedal = 'no-medal';

  private readonly winnerCarClass = 'winners-car';

  private readonly winnersNameClass = 'winners-name';

  public draw(): void {
    const winnersSection = document.getElementById(this.winnersSectionId);

    const winnersTitleDiv = document.createElement('div');
    winnersTitleDiv.classList.add(this.winnersDivClass);
    winnersSection?.appendChild(winnersTitleDiv);

    const winnerPosition = document.createElement('p');
    winnerPosition.classList.add(this.winnersPositionClass);
    winnerPosition.classList.add(this.classWithoutMedal);
    winnerPosition.textContent = '№';

    const winnerCar = document.createElement('p');
    winnerCar.classList.add(this.winnerCarClass);
    winnerCar.textContent = 'Car';

    const winnerName = document.createElement('p');
    winnerName.classList.add(this.winnersNameClass);
    winnerName.textContent = 'Name';

    winnersTitleDiv.appendChild(winnerPosition);
    winnersTitleDiv.appendChild(winnerCar);
    winnersTitleDiv.appendChild(winnerName);

    const winnerWinsDiv = new WinnerSortDiv(this.obj, this.changeWinsOrder, 'wins-counter', 'Wins', 'name-sort').draw();
    const winnerTimeDiv = new WinnerSortDiv(this.obj, this.changeTimeOrder, 'winners-best-time',
      'Best time (seconds)', 'time-sort').draw();
    winnersTitleDiv.appendChild(winnerWinsDiv);
    winnersTitleDiv.appendChild(winnerTimeDiv);
  }
}
