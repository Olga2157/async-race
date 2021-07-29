import { Guid } from 'guid-typescript';
import Winner from '../models/Winner';
import APIService from './APIService';
import TrackService from './TrackService';
import CongratulatePopup from '../components/GarageComponents/CongratulatePopup';
import UtilityUIService from './UtilityUIService';

export default class RaceService {
  private trackService: TrackService;

  private apiService: APIService;

  constructor() {
    this.trackService = new TrackService();
    this.apiService = new APIService();
  }

  public startRace(carIds : string[]) {
    const randomRaceId = Guid.create().toString();
    for (let i = 0; i < carIds.length; i += 1) {
      this.trackService.start(carIds[i], true).then((time) => {
        if (!UtilityUIService.isRaceOver() && !localStorage.getItem(randomRaceId) && time > 0) {
          const winnerId = carIds[i];
          localStorage.setItem(randomRaceId, winnerId.toString());
          const winTimeSeconds = time / 1000;
          const congratulatePopup = new CongratulatePopup(winnerId, winTimeSeconds);
          congratulatePopup.init();
          this.apiService.getWinner(winnerId).then((winnerRes : Winner) => {
            const winner = winnerRes;
            if (winner.id === -1) {
              this.apiService.createWinner(new Winner(Number(winnerId), 1, time / 1000));
            } else {
              const bestTime = Math.min(winner.time, time / 1000);
              winner.wins += 1;
              winner.time = bestTime;
              this.apiService.updateWinner(winner);
            }
          });
        }
      });
    }
  }
}
