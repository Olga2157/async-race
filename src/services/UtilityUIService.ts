export default class UtilityUIService {
  private static readonly resetButtonId = 'reset';

  private static readonly carDivClass = '.garage-car-div';

  private static readonly numberOfLettersBeforeCarId = 4;

  public static isRaceOver() : boolean {
    const resetButton = document
      .getElementById(UtilityUIService.resetButtonId) as HTMLButtonElement;
    return resetButton.disabled;
  }

  public static getCarIds() : string[] {
    const carIdArray : string[] = [];
    const carDivs = document.querySelectorAll(UtilityUIService.carDivClass);
    carDivs.forEach((carDiv) => {
      carIdArray.push(carDiv.id.slice(UtilityUIService.numberOfLettersBeforeCarId));
    });
    return carIdArray;
  }
}
