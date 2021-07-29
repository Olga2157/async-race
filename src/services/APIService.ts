import Car from '../models/Car';
import Winner from '../models/Winner';

export default class APIService {
  private baseUrl = 'https://async-race-api-rss.herokuapp.com/';

  private readonly contentType = 'application/json;charset=utf-8';

  public async getCars<Car>(): Promise<Car[]> {
    const response = await fetch(`${this.baseUrl}garage`);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    return [];
  }

  public async getCar(id: string) : Promise<Car> {
    const response = await fetch(`${this.baseUrl}garage/${id}`);
    if (!response.ok) {
      throw new Error('cannot get car by id');
    } else {
      const json = await response.json();
      return json;
    }
  }

  public async createCar(car: Car) : Promise<Car> {
    const response = await fetch(`${this.baseUrl}garage`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify(car),
    });
    if (!response.ok) {
      throw new Error('cannot create car');
    } else {
      const json = await response.json();
      return json;
    }
  }

  public async updateCar(car: Car) : Promise<void> {
    const response = await fetch(`${this.baseUrl}garage/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify(car),
    });
    if (!response.ok) {
      throw new Error('cannot update car');
    }
  }

  public async deleteCar(carId: string) : Promise<void> {
    const response = await fetch(`${this.baseUrl}garage/${carId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('cannot delete car');
    }
  }

  public async startEngine<DistanceDetails>(carId: string) : Promise<DistanceDetails> {
    const response = await fetch(`${this.baseUrl}engine/?id=${carId}&&status=started`);
    if (!response.ok) {
      throw new Error('cannot create car');
    } else {
      const json = await response.json();
      return json;
    }
  }

  public async stopEngine<DistanceDetails>(carId: string) : Promise<DistanceDetails> {
    const response = await fetch(`${this.baseUrl}engine/?id=${carId}&&status=stopped`);
    if (!response.ok) {
      throw new Error('cannot stop engine');
    } else {
      const json = await response.json();
      return json;
    }
  }

  public async drive(carId: string) : Promise<Response> {
    const response = await fetch(`${this.baseUrl}engine/?id=${carId}&&status=drive`);
    return response;
  }

  public async getWinner(id: string) : Promise<Winner> {
    const response = await fetch(`${this.baseUrl}winners/${id}`);
    if (!response.ok) {
      return new Winner(-1, -1, -1);
    }
    const json = await response.json();
    return json;
  }

  public async createWinner(winner: Winner) : Promise<void> {
    const response = await fetch(`${this.baseUrl}winners`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify(winner),
    });
    if (!response.ok) {
      throw new Error('cannot create winner');
    } else {
      const json = await response.json();
      return json;
    }
  }

  public async deleteWinner(winnerId: string) : Promise<void> {
    const response = await fetch(`${this.baseUrl}winners/${winnerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
      },
    });
    if (!response.ok) {
      throw new Error('cannot delete winner');
    }
  }

  public async updateWinner(winner: Winner) : Promise<void> {
    const response = await fetch(`${this.baseUrl}winners/${winner.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify(winner),
    });
    if (!response.ok) {
      throw new Error('cannot update winner');
    }
  }

  public async getWinners(page: number, limit: number, sortField: string,
    sortOrder: string) : Promise<Winner[]> {
    const response = await fetch(`${this.baseUrl}winners`
    + `?_page=${page}&&_limit=${limit}&&_sort=${sortField}&&_order=${sortOrder}`);
    if (!response.ok) {
      throw new Error('cannot get winners');
    } else {
      const json = await response.json();
      return json;
    }
  }

  public async getWinnersSize() : Promise<number> {
    const response = await fetch(`${this.baseUrl}winners`);
    if (!response.ok) {
      throw new Error('cannot get winners');
    } else {
      const json = await response.json();
      return json.length;
    }
  }
}
