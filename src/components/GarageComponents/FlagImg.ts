export default class FlagImg {
  private readonly flagClass = 'flag';

  private readonly finishImgSrc = 'img/finish.png';

  public draw(): HTMLDivElement {
    const flagDiv = document.createElement('div');
    flagDiv.classList.add(this.flagClass);
    const flagImg = document.createElement('img');
    flagImg.src = this.finishImgSrc;
    flagDiv.appendChild(flagImg);

    return flagDiv;
  }
}
