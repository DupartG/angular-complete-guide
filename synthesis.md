# What is Angular
Angular is a framework "batteries included" which imposes an architecture and ships everything natively and integrated: HTTP client (HttpClient), routing, reactive forms, dependency injection, RxJS as its reactive backbone, and a CLI. Angular is a whole ecosystem.

This is why Angular feels different from other front frameworks: choices like HttpClient over Axios, or RxJS everywhere, are not arbitrary, they follow from one global architectural decision.
In this sense, Angular looks like the "front Spring", it is as opinionated and structured as Spring, while React is more of an unopinionated UI lib you build a stack around. Angular fits large, long-lived enterprise apps and big teams, where imposed conventions keep the codebase consistent over time.

## An evolving framework
Angular has been around for years (Angular 2 in 2016, rewritten from AngularJS) and ships a new major every ~6 months. New paradigms are introduced **opt-in**: old code keeps working while you adopt the new APIs at your own pace, and the CLI provides automated migrations (`ng update` schematics). There are breaking changes across majors, but they are documented and largely auto-migrated. As a result, two axes of variants coexist in today's Angular, and both can be mixed in the same app:
- **change detection**: Zone.js (legacy default) vs Signals (modern, enables zoneless)
- **component packaging**: NgModules (legacy) vs Standalone components (modern default)


### Change detection
How Angular knows when to update the DOM:
- With ZoneJS (still the default in most apps): Zone.js monkey-patches all async browser APIs (setTimeout, Promise, fetch/XHR, addEventListener...). When any async operation completes, Angular doesn't know what changed, so it walks the whole component tree and compares each binding against its previous value to update the DOM. Heavy, coarse-grained process.
- Signals (introduced in v16) are reactive values that track their own consumers. Reading a signal in a template/computed/effect registers that consumer as a dependent; writing the signal notifies exactly those dependents, which then update. Fine-grained and lighter than ZoneJS, and it's what enables zoneless.

### Component packaging
In the same way, modules and standalone components are two ways to design the application and both can coexist:
- NgModules are a packaging feature, they enable accessibility of the components used (declare/imports/exports).
- Standalone components are the modern way, they allow components to be imported one inside another. They are much less boilerplate than modules.
Standalone components are the default since 17

## RxJS, the reactive backbone
RxJS is not an add-on in Angular, it is built into the framework's own APIs. Even without writing RxJS code yourself, observables are everywhere: `HttpClient` returns an observable for each request, routing, reactive forms expose `valueChanges` and `statusChanges` as observables.
This is the same "batteries included" logic as above: Angular picked one reactive model and used it everywhere, instead of letting each team pick its own.

The arrival of signals changed that balance. The modern split is:
- **Signals for state**: a current value the UI displays (a counter, a list, a loading flag).
- **RxJS for events over time**: streams to combine, cancel, debounce or retry (user input, websockets, chained requests).

## Component architecture
A good practice is to separate "dumb" and "smart" components. Smart components hold state, orchestrate, and delegate actual business logic to services. Dumb components only receive or display data, they hold no state and no logic.