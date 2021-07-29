import { VoidFunction } from '../models/VoidFunction';
import AppButton from './AppButton';

export default class PageManager {
  constructor(private wrapperId: string,
    private pageManagementClass: string,
    private pageableObject: Object,
    private prevPageFunction: VoidFunction,
    private nextPageFunction: VoidFunction,
    private disablePrevStatus: boolean = false,
    private disableNextStatus: boolean = false) {
  }

  public draw(): void {
    const pageManagementDiv = document.createElement('div');
    pageManagementDiv.classList.add(this.pageManagementClass);

    const prevButton = new AppButton(`${this.wrapperId}-prev`, 'PREV', ['buttons']).draw();
    prevButton.disabled = this.disablePrevStatus;
    const nextButton = new AppButton(`${this.wrapperId}-next`, 'NEXT', ['buttons']).draw();
    nextButton.disabled = this.disableNextStatus;
    prevButton.addEventListener('click', this.prevPage.bind(this));
    nextButton.addEventListener('click', this.nextPage.bind(this));

    pageManagementDiv.appendChild(prevButton);
    pageManagementDiv.appendChild(nextButton);

    const wrapper = document.getElementById(this.wrapperId);
    wrapper?.appendChild(pageManagementDiv);
  }

  // changing the disable status for prev, next buttons
  public togglePrev(disable: boolean = true): void {
    const prevButton = document.getElementById(`${this.wrapperId}-prev`) as HTMLButtonElement;
    prevButton.disabled = disable;
  }

  public toggleNext(disable: boolean = true): void {
    const nextButton = document.getElementById(`${this.wrapperId}-next`) as HTMLButtonElement;
    nextButton.disabled = disable;
  }

  public prevPage(): void {
    this.prevPageFunction.call(this.pageableObject);
  }

  public nextPage(): void {
    this.nextPageFunction.call(this.pageableObject);
  }
}
