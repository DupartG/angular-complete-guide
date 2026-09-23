RxJs is the library for **reactive programming** in JS: it models **streams of values that arrive over time** (events, data, user actions) and lets you react to, transform and compose them with operators. It shines when managing multi-value sources over time (DOM events, WebSockets, timers, form valueChanges). Angular adopted it as its reactive backbone, so RxJS is everywhere in Angular but remains marginal elsewhere (React/Vue default to native Promises).

It builds everything around two core concepts: **observables and observers**. Observables are streams that carries values emitted by a source, and an observer is an entity that subscribes to those observables with up to 3 handlers: next, error (optional), and complete (optional).
In order to use an observable, it shall be **subscribed**.
By default, an observable without an observer does not kick off.
Subscriptions to long-lived observables (that never complete) MUST be terminated to prevent memory leaks via unsubscribe(), takeUntilDestroyed(), or the async pipe. Observables that complete on their own (e.g. HttpClient) clean up automatically.
There are also **Subjects**: an entity that is both an observable and an observer.

RxJs operators are built-in functions in the lib that can be combined and piped together on an observable.

It is also very important to distinguish observables and signals:
- Observables manage **events and streamed values that arrive over time**, potentially asynchronously (0, 1 or N values). They are lazy (nothing runs until you subscribe) and push-based.
- Signals hold a **single current state value, read synchronously**, that the UI reflects reactively. A signal always has a value (no subscription needed).

Some use cases can be solved by either, and Angular provides tools to convert between them (`toSignal()` / `toObservable()`).