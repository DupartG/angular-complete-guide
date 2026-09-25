import { inject, Injectable } from '@angular/core';

import { Place } from './place.model';
import { HttpClient, httpResource } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private backendDomain = 'http://localhost:3000';
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);
  // "Enterprise" version: httpResource handles loading/error state and subscription lifecycle
  private userPlaces = httpResource(() => this.backendDomain + '/user-places', {
    parse: (resData) => (resData as { places: Place[] }).places,
    defaultValue: [],
  });

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('/places', 'Impossible to load available places');
  }

  //optimistic updating
  addPlaceToUserPlaces(place: Place) {
    const previousPlace = this.currentUserPlaces();

    if (!previousPlace.some((p) => p.id === place.id)) {
      this.userPlaces.set([...previousPlace, place]);
    }
    return this.httpClient.put(this.backendDomain + '/user-places', { placeId: place.id }).pipe(
      catchError(() => {
        this.userPlaces.set(previousPlace); //rollback if update failed
        this.errorService.showError('Failed to add a new place');
        return throwError(() => new Error('Failed to add a new place'));
      }),
    );
  }

  removeUserPlace(place: Place) {
    const previousPlace = this.currentUserPlaces();
    this.userPlaces.set(previousPlace.filter((p) => p.id !== place.id));

    return this.httpClient.delete(this.backendDomain + '/user-places/' + place.id)
    .pipe(
      catchError(() => {
        this.userPlaces.set(previousPlace); //rollback if delete failed
        this.errorService.showError('Failed to delete place');
        return throwError(() => new Error('Failed to delete place'));
      }),
    );
  }

  // value() throws while the resource is in error state, hasValue() guards against it
  private currentUserPlaces() {
    return this.userPlaces.hasValue() ? this.userPlaces.value() : [];
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(this.backendDomain + url).pipe(
      map((resData) => resData.places), // from type Observable<{ places: Place[] }> to Observable<Place[]>.
      catchError(() => throwError(() => new Error(errorMessage))),
    );
  }
}
