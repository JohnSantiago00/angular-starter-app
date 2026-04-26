import { Injectable } from '@angular/core';
import { HousingLocationInfo } from './housing-location';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  readonly url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
    const response = await fetch(this.url);

    if (!response.ok) {
      throw new Error(`Failed to fetch housing locations: ${response.status}`);
    }

    return (await response.json()) as HousingLocationInfo[];
  }

  async getHousingLocationById(id: number): Promise<HousingLocationInfo | undefined> {
    const response = await fetch(`${this.url}/${id}`);

    if (response.status === 404) {
      return undefined;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch housing location ${id}: ${response.status}`);
    }

    return (await response.json()) as HousingLocationInfo;
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
