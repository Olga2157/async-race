import GitHub from '../shared/GitHub';
import RSS from '../shared/RSS';

export default class Footer {
  private readonly footer = 'footer';

  private readonly gitHubLink = 'https://github.com/Olga2157';

  private readonly rssLink = 'https://rs.school/js/';

  public init(): void {
    const footerElement = document.createElement(this.footer);
    footerElement.id = this.footer;
    document.body.appendChild(footerElement);
    new GitHub(this.gitHubLink).init();
    new RSS(this.rssLink).init();
  }
}
