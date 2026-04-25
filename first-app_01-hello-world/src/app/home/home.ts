import { Component, inject } from '@angular/core';
import { HousingService } from '../housing';
import { HousingLocationInfo } from '../housing-location';
import { HousingLocation } from '../housing-location/housing-location';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" />
        <button class="primary" type="button">Search</button>
      </form>
    </section>

    <section class="results">
      
      @for (housingLocation of housingLocationList; track $index) {
        <app-housing-location [housingLocation]="housingLocation" />
      }

    </section>
  `,
  styleUrls: ['./home.css']
})
export class Home {

  housingLocationList: HousingLocationInfo[] = []

  housingService: HousingService = inject(HousingService)

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations()
  }
}