import SortImg from './SortImg';

export default class WinnerSortDiv {
  private readonly sortClass = 'sort';

  constructor(
    public obj: Object,
    public changeOrder: VoidFunction,
    private counterClass : string,
    private textContent : string,
    private arrowsId : string,
  ) {
  }

  public draw(): HTMLDivElement {
    const winnerWinsDiv = document.createElement('div');
    winnerWinsDiv.classList.add(this.sortClass);
    const winnerWinsText = document.createElement('p');
    winnerWinsText.classList.add(this.counterClass);
    winnerWinsText.textContent = this.textContent;
    winnerWinsDiv.appendChild(winnerWinsText);
    const winsSortImg = new SortImg(this.arrowsId).draw();
    winnerWinsDiv.appendChild(winsSortImg);
    winsSortImg.addEventListener('click', this.sortByField.bind(this));
    return winnerWinsDiv;
  }

  private sortByField() {
    this.changeOrder.call(this.obj);
  }
}
