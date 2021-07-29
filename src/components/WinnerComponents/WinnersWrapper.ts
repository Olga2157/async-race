import WinnersCounter from './WinnersCounter';
import WinnersPageCounter from './WinnersPageCounter';
import PageManager from '../../shared/PageManager';
import WinnersTitleDiv from './WinnersTitleDiv';
import WinnerDetails from '../../models/WinnerDetails';
import WinnerDiv from './WinnerDiv';
import RacerImg from './RacerImg';
import RacingImg from '../../shared/RacingImg';

export default class WinnersWrapper {
  private counter: WinnersCounter;

  private pageManager: PageManager;

  private winnersPageCounter: WinnersPageCounter;

  private readonly pageLimit = 10;

  private readonly winnersWrapperId = 'winners-wrapper';

  private readonly winnersPageManagementId = 'winners-management';

  private readonly winnersSectionId = 'winners-section';

  private readonly noneLabel = 'none';

  constructor(
    public winnerService: Object,
    public prevPageFunction: VoidFunction,
    public nextPageFunction: VoidFunction,
    public changeWinsOrder: VoidFunction,
    public changeTimeOrder: VoidFunction,
  ) {
    this.counter = new WinnersCounter(0);
    this.winnersPageCounter = new WinnersPageCounter(0);
    this.pageManager = new PageManager(this.winnersWrapperId, this.winnersPageManagementId,
      this.winnerService, this.prevPageFunction, this.nextPageFunction);
  }

  public draw(winners: WinnerDetails[], nextPageExist: boolean,
    currentPage: number, winnersLength: number): void {
    const winnerWrapper = document.createElement('div');
    winnerWrapper.id = this.winnersWrapperId;

    document.body.insertBefore(winnerWrapper, document.body.children[2]);

    this.counter = new WinnersCounter(winnersLength);
    this.counter.draw();

    this.winnersPageCounter = new WinnersPageCounter(currentPage);
    this.winnersPageCounter.draw();

    const winnersSection = document.createElement('section');
    winnersSection.id = this.winnersSectionId;
    winnerWrapper.appendChild(winnersSection);

    new WinnersTitleDiv(this.winnerService, this.changeWinsOrder, this.changeTimeOrder).draw();

    this.drawWinners(winners, winnersSection);

    new RacingImg(this.winnersWrapperId).draw();

    this.pageManager.draw();
    this.pageManager.togglePrev();

    new RacerImg().draw();

    if (nextPageExist) {
      this.pageManager.toggleNext(false);
    } else {
      this.pageManager.toggleNext();
    }
    winnerWrapper.style.display = this.noneLabel;
  }

  public updateWinners(winnerDetails: WinnerDetails[],
    nextPageExist: boolean, currentPage: number, winnersLength: number) {
    this.counter.updateCounter(winnersLength);
    this.winnersPageCounter.updatePageCounter(currentPage);
    if (currentPage === 1) {
      this.pageManager.togglePrev();
    } else {
      this.pageManager.togglePrev(false);
    }
    if (nextPageExist) {
      this.pageManager.toggleNext(false);
    } else {
      this.pageManager.toggleNext();
    }
    const winnerSection = document.getElementById(this.winnersSectionId) as HTMLElement;
    const title = document.getElementById(this.winnersSectionId)?.children[0];
    while (title?.nextSibling) {
      title.nextSibling.remove();
    }
    this.drawWinners(winnerDetails, winnerSection);
  }

  private drawWinners(winners: WinnerDetails[], winnersSection: HTMLElement) {
    for (let i = 0; i <= this.pageLimit; i += 1) {
      if (i >= winners.length) {
        break;
      }
      const winnerDiv = new WinnerDiv(i + 1, winners[i].color,
        winners[i].name, winners[i].winner.wins, winners[i].winner.time).draw();
      winnersSection?.appendChild(winnerDiv);
    }
  }
}
