# Angular - The Complete Guide

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-7-B7178C?logo=reactivex&logoColor=white)
![Node](https://img.shields.io/badge/Node-22-339933?logo=node.js&logoColor=white)

This repo is my hands-on work for the Udemy course [The Complete Guide to Angular](https://www.udemy.com/course/the-complete-guide-to-angular-2/), organised as an npm-workspaces monorepo. Each chapter is its own Angular application.

**Every chapter runs on Angular 21.** The course was recorded on Angular ~19 (some starter projects on 18). For each chapter I generated a fresh Angular 21 scaffold and moved the course code into it, instead of patching the old tooling.

**Modern and legacy side by side.** Even though the course prioritizes modern Angular (16+), some chapters cover both designs: NgModules vs standalone components, Zone.js vs Signals, `@Input` vs `input()`.

**Written notes.** Most chapters contain a `synthesis.md` file with my notes, and the [root synthesis](synthesis.md) covers general knowledge.


## Chapters

| # | Folder | App | Main topics |
|---|---|---|---|
| 01 | [`01-getting_started`](01-getting_started) | — | What Angular is, how its versions evolved (notes only) |
| 02 | [`02-essentials`](02-essentials) | **EasyTask** | Standalone components, bindings, `@if` / `@for`, inputs/outputs, services & DI |
| 03 | [`03-modules`](03-modules) | EasyTask (NgModules) | The same app refactored with `NgModule`s: declarations, imports/exports, shared & feature modules |
| 04 | [`04-essentials-practice`](04-essentials-practice) | **Investment calculator** | Practice project built with NgModules and decorator-based `@Input` / `@Output` |
| 04 bis | [`04-essentials-practice-bis`](04-essentials-practice-bis) | Investment calculator (modern) | My own rewrite with standalone components, signals, `input()` / `output()` and a redesigned UI |
| 05 | [`05-debugging`](05-debugging) | — | Browser DevTools and Angular DevTools (notes only) |
| 06 | [`06-components-deep-dive`](06-components-deep-dive) | **Admin dashboard** | Splitting a UI into reusable components, attribute selectors to extend native elements, content projection with `ng-content` *(in progress)* |
| 11 | [`11-rxjs-&-observables`](11-rxjs-&-observables) | RxJS playground | Observables, operators, subscription cleanup, `toSignal()` / `toObservable()`, signals vs observables |
| 12 | [`12-HTTP-requests`](12-HTTP-requests) | **Places picker** + Express API | `HttpClient`, error handling, optimistic updates. The course pattern and an "enterprise" pattern (`httpResource`) are shown side by side |
| 14 | [`14-routing`](14-routing) | EasyTask (routed) | Adding routing to the EasyTask app *(in progress)* |

I went for breadth: seeing every major feature Angular offers, instead of spending weeks on a single topic. That's why some chapters are skipped.

## Highlights

These are the best places to start if you're reviewing the code:

- **[12-HTTP-requests](12-HTTP-requests/synthesis.md).** `AvailablePlaces` uses the course pattern: manual `isFetching` / `error` signals, `DestroyRef`, `catchError`. `UserPlaces` does the same job with `httpResource()`: no manual state, no subscription to clean up. The synthesis explains the trade-offs and caveats.
- **[04 vs 04 bis](04-essentials-practice-bis).** The same investment calculator written twice, with NgModules + decorators and then with standalone components + signals.
- **[Root synthesis](synthesis.md).** My overview of how Angular is designed and why it feels like "the Spring of the frontend".

## Running an app

Requirements: **Node 22+** and npm.

```bash
npm install                      # installs every workspace once, from the repo root
npm start -w <workspace-name>    # runs `ng serve` for that app → http://localhost:4200
npm test -w <workspace-name>     # runs the Vitest unit tests for that app
```

| Workspace name | Folder |
|---|---|
| `essentials` | `02-essentials` |
| `modules` | `03-modules` |
| `essentials-practice` | `04-essentials-practice` |
| `modern` | `04-essentials-practice-bis` |
| `components-deep-dive` | `06-components-deep-dive` |
| `rxjs-observables` | `11-rxjs-&-observables` |
| `http-requests` | `12-HTTP-requests/http-requests` |
| `routing` | `14-routing` |

Chapter 12 also needs its backend running on port 3000:

```bash
cd 12-HTTP-requests/backend && npm install && npm start
```

## Tech stack

Angular 21 · TypeScript · RxJS · Signals · Vitest · Express (chapter 12 backend) · Prettier · npm workspaces
