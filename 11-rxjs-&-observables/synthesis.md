RxJs **is not** an Angular feature, it's an independent library  that Angular relies on massively

An observable is an object provided by RxJS. When you subscribe, you pass an Observer with up to 3 handlers: next (receives each emitted value), error (optional), and complete (optional).
In order to use an observable, it shall be **subscribed**.
By default, observable without subscriber does not kick off.
Subscriptions to long-lived observables (that never complete) MUST be terminated to prevent memory leaks via unsubscribe(), takeUntilDestroyed(), or the async pipe. Observables that complete on their own (e.g. HttpClient) clean up automatically.

RxJs operators are built-in functions in the lib that can be combined and piped altogether on an observable.

Observables watch over values emitted by a source, a Subject is both an Observable and an Observer, so it can act as the source and be subscribed to.

It is also very important to distinguish observables and signals:
- Observables manage **events and streamed values that arrive over time**, potentially asynchronously (0, 1 or N values). They are lazy (nothing runs until you subscribe) and push-based.
- Signals hold a **single current state value, read synchronously**, that the UI reflects reactively. A signal always has a value (no subscription needed).

Some use cases can be solved by either, and Angular provides tools to convert between them (`toSignal()` / `toObservable()`).