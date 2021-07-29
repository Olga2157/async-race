export default class RSS {
  private readonly rssClass = 'rss';

  private readonly targetValue = '_blank';

  private readonly openLinkWay = 'noopener noreferrer';

  private readonly rssYearClass = 'rss-year';

  private readonly rssYearText = "'21";

  constructor(
    public rssLink: string,
  ) {
  }

  public init(): void {
    const rss = document.createElement('a');
    rss.classList.add(this.rssClass);
    rss.href = this.rssLink;
    rss.target = this.targetValue;
    rss.rel = this.openLinkWay;
    const rssYear = document.createElement('span');
    const rssYearText = document.createTextNode(this.rssYearText);
    rssYear.appendChild(rssYearText);
    rssYear.classList.add(this.rssYearClass);
    rss.appendChild(rssYear);

    const footerElement = document.getElementsByTagName('footer');
    footerElement[0]?.appendChild(rss);
  }
}
