# angular-complete-guide

This repo follows the Udemy course [The Complete Guide to Angular](https://www.udemy.com/course/the-complete-guide-to-angular-2/). It is being built as a **portfolio piece for recruiters**, so code quality and clarity matter beyond just "does it work".

## Repository structure

Each numbered top-level folder is a **snapshot of the app for one stage of the course**:

- `01-getting_started/` — intro material only, no Angular app.
- `02-essentials/essentials/` — first real app, built with standalone components.
- `03-modules/modules/` — copy of the 02 app, reworked to use NgModules instead of standalone components (this is what that lesson covers).
- Later folders (`04-...` etc.) will each be a copy of the previous variant, modified for whatever the next lesson introduces.

Each app folder (from `02-essentials/essentials` onward) is a self-contained Angular workspace (own `angular.json`, own `package.json` with its Angular deps), but **all of them share a single `node_modules`** via npm workspaces declared in the root `package.json`. Per-project settings (like schematics defaults, e.g. `standalone: false` in `03-modules/modules/angular.json`) live in each project's own `angular.json` and do not leak into sibling projects.

Every folder contains a `synthesis.md` with notes on what was learned in that stage. These notes are written in English.

## Angular version

The course was recorded against an older Angular version (~19). This workspace runs **Angular 21** (see `@angular/core` in each app's `package.json`), but the installed CLI version is what matters for tooling/file conventions, not for which coding patterns to default to.

Default to writing code the way the course teaches (Angular 19-style), not the latest Angular 21 idioms — unless explicitly told otherwise for a given piece of code. The one deliberate exception is file naming: use the current CLI schematics convention (e.g. `app.ts` / `app.html`, not `app.component.ts` / `app.component.html`), since that's just a generated-file naming convention, not a coding pattern the course is teaching.
