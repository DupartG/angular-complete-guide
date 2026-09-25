import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { Places } from '../places';
import { PlacesContainer } from '../places-container/places-container';
import { finalize } from 'rxjs';
import { PlacesService } from '../places.service';

// Course pattern, kept on purpose: manual loading/error state and subscription cleanup.
// Compare with UserPlaces, which relies on httpResource() in PlacesService.
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
      .pipe(finalize(() => this.isFetching.set(false)))
      .subscribe({
        next: (places) => this.places.set(places),
        error: (error: Error) => this.error.set(error.message),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSelectPlace(place: Place) {
    this.placesService.addPlaceToUserPlaces(place).subscribe();
  }
}
