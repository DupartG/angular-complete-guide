import { Component } from '@angular/core';

import { AvailablePlaces } from './places/available-places/available-places';
import { UserPlaces } from './places/user-places/user-places';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [AvailablePlaces, UserPlaces],
})
export class App {}
