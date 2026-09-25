import { Component, input, output } from '@angular/core';

import { Place } from './place.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-places',
  imports: [],
  templateUrl: './places.html',
  styleUrl: './places.css',
})
export class Places {
  places = input.required<Place[]>();
  imageBaseUrl = environment.apiUrl;
  selectPlace = output<Place>();

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
