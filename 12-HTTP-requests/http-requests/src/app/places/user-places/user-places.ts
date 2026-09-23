import { Component } from '@angular/core';

import { PlacesContainer } from '../places-container/places-container';
import { Places } from '../places';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.html',
  styleUrl: './user-places.css',
  imports: [PlacesContainer, Places],
})
export class UserPlaces {}
