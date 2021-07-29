import APIService from './APIService';
import WinnersWrapper from '../components/WinnerComponents/WinnersWrapper';
import WinnerDetails from '../models/WinnerDetails';
import { SortOrder } from '../models/Enums/SortOrder';
import { SortField } from '../models/Enums/SortField';

export default class WinnersService {
  private currentPage;

  private sortByWins;

  private sortByTime;

  private sortField;

  private api;

  private winnersWrapper : WinnersWrapper;

  private readonly pageLimit = 10;

  constructor() {
    this.currentPage = 1;
    this.api = new APIService();
    this.sortField = SortField.wins;
    this.sortByWins = SortOrder.asc;
    this.sortByTime = SortOrder.asc;
    this.winnersWrapper = new WinnersWrapper(this, this.prevPage,
      this.nextPage, this.changeWinsOrder, this.changeTimeOrder);
  }

  public async init(redraw: boolean = false, sortOrderPar: string = '') {
    let sortOrder = sortOrderPar;
    if (!sortOrder) {
      if (this.sortField === SortField.time) {
        sortOrder = SortOrder[this.sortByTime].toString();
      } else {
        sortOrder = SortOrder[this.sortByWins].toString();
      }
    }
    await this.api.getWinners(this.currentPage, this.pageLimit,
      SortField[this.sortField].toString(), sortOrder).then((winners) => {
      const winnerDetails = new Array<WinnerDetails>();
      const carPromises = [];
      for (let i = 0; i < winners.length; i += 1) {
        const curCarPromise = this.api.getCar(winners[i].id.toString());
        carPromises.push(curCarPromise);
        curCarPromise.then((car) => {
          winnerDetails[i] = new WinnerDetails(winners[i], car.color, car.name);
        });
      }
      Promise.all(carPromises).then(() => {
        this.api.getWinners(this.currentPage + 1, this.pageLimit,
          SortField[this.sortField].toString(), sortOrder).then((nextPageWinners) => {
          const nextPageExist = nextPageWinners.length > 0;
          this.api.getWinnersSize().then((size) => {
            if (redraw) {
              this.winnersWrapper.updateWinners(winnerDetails, nextPageExist,
                this.currentPage, size);
            } else {
              this.winnersWrapper.draw(winnerDetails, nextPageExist, this.currentPage, size);
            }
          });
        });
      });
    });
  }

  public nextPage() : void {
    this.currentPage += 1;
    this.init(true);
  }

  public prevPage() : void {
    this.currentPage -= 1;
    this.init(true);
  }

  public changeWinsOrder() : void {
    this.sortField = SortField.wins;
    if (this.sortByWins === SortOrder.asc) {
      this.sortByWins = SortOrder.desc;
    } else {
      this.sortByWins = SortOrder.asc;
    }
    this.init(true, SortOrder[this.sortByWins].toString());
  }

  public changeTimeOrder() : void {
    this.sortField = SortField.time;
    if (this.sortByTime === SortOrder.asc) {
      this.sortByTime = SortOrder.desc;
    } else {
      this.sortByTime = SortOrder.asc;
    }
    this.init(true, SortOrder[this.sortByTime].toString());
  }
}
