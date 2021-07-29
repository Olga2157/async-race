export default class WinnersCounter {
  private winnerCounterId = 'winner-counter-id';

  private readonly winnerWrapperId = 'winners-wrapper';

  constructor(private counter: number) {
  }

  public draw(): void {
    const winnersTitle = document.createElement('h2');
    winnersTitle.id = this.winnerCounterId;
    winnersTitle.textContent = `Winners (${this.counter.toString()})`;
    const winnersWrapper = document.getElementById(this.winnerWrapperId);
    winnersWrapper?.appendChild(winnersTitle);
  }

  public updateCounter(newCounter: number) {
    const totalWinners = document.getElementById(this.winnerCounterId);
    if (totalWinners) {
      totalWinners.textContent = `Winners (${newCounter.toString()})`;
    }
  }
}
