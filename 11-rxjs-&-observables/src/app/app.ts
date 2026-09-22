import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs'; // emits sequentiel number

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount); //cast signal to observable '$' at the end is common practice.
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });

  ngOnInit(): void {
    const intervalSubscription = interval(1000)
      .pipe(
        map((val) => val + 1), //start with 1 instead of 0
      )
      .subscribe({
        next: (val) => console.log(val), //callback when receiving a value
        complete: () => {}, //trigger when the observable is completed
        error: () => {}, //trigger when an error occured
      });
    //complet and error are optionnal

    this.destroyRef.onDestroy(() => intervalSubscription.unsubscribe());
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
