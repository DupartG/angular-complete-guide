import { Component, signal } from '@angular/core';

import { Place } from '../place.model';
import { Places } from '../places';
import { PlacesContainer } from '../places-container/places-container';

@Component({
  selector: 'app-available-places',
  templateUrl: './available-places.html',
  styleUrl: './available-places.css',
  imports: [Places, PlacesContainer],
})
export class AvailablePlaces {
  places = signal<Place[] | undefined>(undefined);
}
