import { InitWinnerFunction } from '../models/InitWinnerFunction';
import NavButton from '../shared/NavButton';

export default class NavigationPanel {
  private readonly garageWrapper = 'garage-wrapper';

  private readonly winnerWrapper = 'winners-wrapper';

  private readonly noneLabel = 'none';

  private readonly navClass = 'main-pages';

  private readonly toGarageLabel = 'To Garage';

  private readonly toWinnersLabel = 'To Winners';

  constructor(public winners: Object,
    public initFunction: InitWinnerFunction) {
  }

  public init(): void {
    const nav = document.createElement('section');
    nav.classList.add(this.navClass);
    document.body.appendChild(nav);
    new NavButton(this.toGarageLabel, this.showGarage, this).init();
    new NavButton(this.toWinnersLabel, this.showWinners, this).init();
  }

  private showWinners() {
    this.initFunction.call(this.winners, true);
    const garageWrapper = document.getElementById(this.garageWrapper);
    if (garageWrapper) {
      garageWrapper.style.display = this.noneLabel;
    }
    const winnerWrapper = document.getElementById(this.winnerWrapper);
    if (winnerWrapper) {
      winnerWrapper.style.display = '';
    }
  }

  private showGarage() {
    const garageWrapper = document.getElementById(this.garageWrapper);
    if (garageWrapper) {
      garageWrapper.style.display = '';
    }
    const winnerWrapper = document.getElementById(this.winnerWrapper);
    if (winnerWrapper) {
      winnerWrapper.style.display = this.noneLabel;
    }
  }
}
