import Car from '../../models/Car';
import APIService from '../../services/APIService';

export default class CongratulatePopup {
  private readonly congratulatePopup: HTMLElement;

  private readonly winImgSrc = 'img/winner.png';

  private apiService: APIService;

  private readonly congratPopupClass = 'congratulation-popup-container';

  private readonly congratPopupId = 'congrat-popup';

  private readonly garageWrapperId = 'garage-wrapper';

  private readonly congratTitle = 'Congratulations!';

  private readonly winImageDivClass = 'win';

  constructor(public winCarId: string,
    public winTimeSeconds: number) {
    this.congratulatePopup = document.createElement('div');
    this.apiService = new APIService();
  }

  public init(): void {
    this.apiService.getCar(this.winCarId).then(
      (car: Car) => {
        this.congratulatePopup.classList.add(this.congratPopupClass);
        this.congratulatePopup.id = this.congratPopupId;
        this.congratulatePopup.setAttribute('z-index', '2');

        const wrapper = document.getElementById(this.garageWrapperId);
        wrapper?.appendChild(this.congratulatePopup);

        const CongratulateTitle = document.createElement('h2');
        CongratulateTitle.textContent = this.congratTitle;
        const winCarName = car.name;

        const congratulationDetails = document.createElement('p');
        const congratulationDetailsText = document.createTextNode(`${winCarName} went first with time : ${this.winTimeSeconds} s`);
        congratulationDetails.appendChild(congratulationDetailsText);

        const winImageDiv = document.createElement('div');
        winImageDiv.classList.add(this.winImageDivClass);
        const winImage = document.createElement('img');
        winImage.src = this.winImgSrc;
        winImageDiv.appendChild(winImage);

        this.congratulatePopup.appendChild(CongratulateTitle);
        this.congratulatePopup.appendChild(congratulationDetails);
        this.congratulatePopup.appendChild(winImageDiv);
      },
    );
  }
}
