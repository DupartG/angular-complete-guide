import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { PlacesService } from './places.service';
import { Place } from './place.model';
import { ErrorService } from '../shared/error.service';
import { environment } from '../../environments/environment';

const PLACE_A: Place = { id: 'p1', title: 'A', image: { src: 'a.jpg', alt: 'A' }, lat: 0, lon: 0 };
const PLACE_B: Place = { id: 'p2', title: 'B', image: { src: 'b.jpg', alt: 'B' }, lat: 0, lon: 0 };

describe('PlacesService', () => {
  let service: PlacesService;
  let httpTesting: HttpTestingController;
  let errorService: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PlacesService);
    httpTesting = TestBed.inject(HttpTestingController);
    errorService = TestBed.inject(ErrorService);

    // httpResource fires its GET once the injector ticks
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}/user-places`).flush({ places: [PLACE_A] });
    TestBed.tick();
  });

  afterEach(() => httpTesting.verify());

  it('loads the user places through httpResource', () => {
    expect(service.loadedUserPlaces.value()).toEqual([PLACE_A]);
  });

  it('adds a place optimistically, before the backend answers', () => {
    service.addPlaceToUserPlaces(PLACE_B).subscribe();

    expect(service.loadedUserPlaces.value()).toEqual([PLACE_A, PLACE_B]);
    httpTesting.expectOne(`${environment.apiUrl}/user-places`).flush({});
    expect(service.loadedUserPlaces.value()).toEqual([PLACE_A, PLACE_B]);
  });

  it('rolls back and reports an error when adding fails', () => {
    service.addPlaceToUserPlaces(PLACE_B).subscribe({ error: () => {} });

    httpTesting
      .expectOne(`${environment.apiUrl}/user-places`)
      .flush(null, { status: 500, statusText: 'Server Error' });

    expect(service.loadedUserPlaces.value()).toEqual([PLACE_A]);
    expect(errorService.error()).toBe('Failed to add a new place');
  });

  it('rolls back and reports an error when removing fails', () => {
    service.removeUserPlace(PLACE_A).subscribe({ error: () => {} });
    expect(service.loadedUserPlaces.value()).toEqual([]);

    httpTesting
      .expectOne(`${environment.apiUrl}/user-places/${PLACE_A.id}`)
      .flush(null, { status: 500, statusText: 'Server Error' });

    expect(service.loadedUserPlaces.value()).toEqual([PLACE_A]);
    expect(errorService.error()).toBe('Failed to delete place');
  });
});
