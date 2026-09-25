Optimistic updating is when UI is rendering backend data before it responded (like in addPlaceToUserPlaces)

## Course pattern vs "enterprise" pattern

Following the course, every GET call in a component ends up with the same boilerplate:
- an `isFetching` signal toggled around the request (`finalize()`),
- an `error` signal filled in the subscribe `error` handler,
- a `DestroyRef` + `unsubscribe()` so the request is cancelled if the component is destroyed before the response,
- `catchError()` in the service to turn the raw HTTP error into a readable one.

It is useful to write it by hand once to understand what happens, but it quickly becomes repetitive. Modern Angular removes most of it:
- `takeUntilDestroyed()` replaces the `DestroyRef` + `unsubscribe()` pair with a single operator.
- `toSignal()` removes the `subscribe()` altogether (loading and error state still to handle).
- `httpResource()` (Angular 19.2+, stable in 21) wraps a GET request into signals: `value()`, `isLoading()`, `error()`, `hasValue()`. No subscribe, no manual state, no cleanup: the request is cancelled automatically when its owner is destroyed.
- An `HttpInterceptor` can centralise error handling (e.g. calling the `ErrorService`) instead of repeating `catchError()` in every method.

In this app, `AvailablePlaces` keeps the course pattern, while `UserPlaces` uses the enterprise one
Caveats:
- `httpResource` is meant for **reading** data. Mutations (PUT, DELETE, POST) still go through `HttpClient`.
- `value()` throws when the resource is in error state, so it must be guarded with `hasValue()`.
- In a `providedIn: 'root'` service, the resource fires as soon as the service is first injected, not when the component using it is displayed.
