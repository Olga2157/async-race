export default class GaragePageCounter {
  private readonly pageId = 'pageId';

  private readonly garageWrapperId = 'garage-wrapper';

  private readonly pagePrefix = 'Page #';

  constructor(private pageCounter: number) {
  }

  public draw(): void {
    const garagePageTitle = document.createElement('h3');
    garagePageTitle.textContent = `${this.pagePrefix}${this.pageCounter.toString()}`;
    garagePageTitle.id = this.pageId;
    const garageWrapper = document.getElementById(this.garageWrapperId);
    garageWrapper?.appendChild(garagePageTitle);
  }

  public updatePageCounter(newCounter: number) {
    const currentPage = document.getElementById(this.pageId);
    if (currentPage) {
      currentPage.textContent = `${this.pagePrefix}${newCounter.toString()}`;
    }
  }
}
