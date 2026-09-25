import { Component, inject } from '@angular/core';

import { PlacesContainer } from '../places-container/places-container';
import { Places } from '../places';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.html',
  styleUrl: './user-places.css',
  imports: [PlacesContainer, Places],
})
export class UserPlaces {
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;

  onSelectPlace(place: Place) {
    this.placesService.removeUserPlace(place).subscribe();
  }
}
