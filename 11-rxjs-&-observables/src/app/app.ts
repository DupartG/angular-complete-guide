import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); // the '$' suffix is the convention for observables
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  ngOnInit(): void {
    const intervalSubscription = interval(1000)
      .pipe(
        map((val) => val + 1), // interval() starts at 0
      )
      .subscribe({
        next: (val) => console.log(val), // `error` and `complete` handlers are optional
      });

    this.destroyRef.onDestroy(() => intervalSubscription.unsubscribe());
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
