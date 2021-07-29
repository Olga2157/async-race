export default class GitHub {
  private readonly gitHubClass = 'github';

  private readonly targetValue = '_blank';

  private readonly openLinkWay = 'noopener noreferrer';

  private readonly gitHubText = 'github';

  constructor(
    public gitHubLink: string,
  ) {
  }

  public init(): void {
    const github = document.createElement('a');
    github.classList.add(this.gitHubClass);
    github.href = this.gitHubLink;
    github.target = this.targetValue;
    github.rel = this.openLinkWay;
    const githubText = document.createTextNode(this.gitHubText);
    github.appendChild(githubText);

    const footerElement = document.getElementsByTagName('footer');
    footerElement[0]?.appendChild(github);
  }
}
