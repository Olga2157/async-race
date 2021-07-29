export default class SortImg {
  private readonly arrowsSrc = 'img/arrows.png';

  private readonly arrowsAlt = 'arrows';

  constructor(
    public arrowsId: string,
  ) {
  }

  public draw(): HTMLElement {
    const imgWrapper = document.createElement('a');
    const arrowsImg = document.createElement('img');
    arrowsImg.src = this.arrowsSrc;
    arrowsImg.alt = this.arrowsAlt;
    arrowsImg.id = this.arrowsId;
    imgWrapper.appendChild(arrowsImg);
    return imgWrapper;
  }
}
