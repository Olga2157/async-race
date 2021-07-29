export default class WinnersPageCounter {
  private winnerPageId = 'winnersPageId';

  private readonly pagePrefix = 'Page #';

  private readonly winnersWrapperId = 'winners-wrapper';

  constructor(private winnersPageCounter: number) {
  }

  public draw(): void {
    const winnersPageTitle = document.createElement('h3');
    winnersPageTitle.textContent = `${this.pagePrefix}${this.winnersPageCounter.toString()}`;
    winnersPageTitle.id = this.winnerPageId;
    const winnersWrapper = document.getElementById(this.winnersWrapperId);
    winnersWrapper?.appendChild(winnersPageTitle);
  }

  public updatePageCounter(newCounter: number) {
    const currentPage = document.getElementById(this.winnerPageId);
    if (currentPage) {
      currentPage.textContent = `${this.pagePrefix}${newCounter.toString()}`;
    }
  }
}
