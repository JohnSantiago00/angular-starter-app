import { Component, input } from '@angular/core';
import { HousingLocationInfo } from '../housing-location';


@Component({
  selector: 'app-housing-location',
  imports: [],
  template: `
    <p>
      housing-location works!
    </p>
  `,
  styleUrls: ['./housing-location.css']
})
export class HousingLocation {

  housingLocation = input.required<HousingLocationInfo>()

}
