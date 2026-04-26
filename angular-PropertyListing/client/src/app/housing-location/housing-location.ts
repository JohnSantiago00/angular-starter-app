import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HousingLocationInfo } from '../housing-location';


@Component({
  selector: 'app-housing-location',
  imports: [RouterLink],
  template: `
   <section >
    <img
      class="listing-photo"
      [src]="housingLocation().photo" 
      alt="Exterior phot of {{ housingLocation().name }}"
      crossorigin
    />

    <h2 class="listing-heading">{{ housingLocation().name }} </h2>
    <p class="listing-location"> {{ housingLocation().city }}, {{ housingLocation().state}} </p>
    <a [routerLink]="['/details', housingLocation().id]">Learn More</a>

   </section>
  `,
  styleUrls: ['./housing-location.css']
})
export class HousingLocation {

  housingLocation = input.required<HousingLocationInfo>()

}
