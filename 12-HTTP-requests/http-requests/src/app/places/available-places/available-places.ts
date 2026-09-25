import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { Places } from '../places';
import { PlacesContainer } from '../places-container/places-container';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  templateUrl: './available-places.html',
  styleUrl: './available-places.css',
  imports: [Places, PlacesContainer],
})
export class AvailablePlaces implements OnInit {
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placesService
      .loadAvailablePlaces()
      .pipe(finalize(() => this.isFetching.set(false))) //equivalent to finally
      .subscribe({
        next: (places) => this.places.set(places),
        complete: () => console.log('fetching successful'),
        error: (error: Error) => this.error.set(error.message),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectPlace(place: Place) {
    this.placesService.addPlaceToUserPlaces(place).subscribe();
  }
}
