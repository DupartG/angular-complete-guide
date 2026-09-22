---
name: add-course-chapter
description: Import a new course chapter into this repo from a Udemy "starting project" zip export. Use this whenever the user says they've added a new numbered top-level folder (e.g. `11-rxjs _&_observables/`) containing a zip, and asks to unzip it and bring it up to the workspace's current Angular version — including short/informal requests like "j'ai ajouté un nouveau dossier, unzip et passe-le en 21 comme les autres", "new chapter, same routine as usual", "bump this one to Angular 21 like the others", or just naming the new folder and saying "tu connais la chanson". The zip is always an old Angular CLI scaffold (course was recorded around Angular 19, but individual zips can be as old as Angular 18) that needs its course content preserved but its tooling regenerated fresh, not patched in place.
---

# Add course chapter

This repo (`angular-complete-guide`) is a portfolio project following a Udemy Angular course. Read `.claude/CLAUDE.md` first — it's the source of truth for which Angular version and which coding-style era (course-era patterns vs. current CLI conventions) the workspace targets right now. This skill only codifies the *mechanical* import steps; it doesn't hardcode the version, because that drifts as the course progresses and CLAUDE.md is what actually gets updated.

## Why regenerate instead of upgrading in place

The zip's `package.json`/`angular.json`/`tsconfig*.json` belong to whatever Angular version the course was recorded on. Trying to `ng update` an old scaffold in place tends to fight the CLI and produces a tree that doesn't match every other numbered folder in this repo. It's more reliable — and it's what every existing numbered folder was built this way — to treat the zip purely as a source of *course content* (the component code, markup, styles, and assets the lesson is actually about) and drop that content into a freshly generated scaffold on the current version.

## Steps

1. **Find and unzip.** The zip lives inside the newly added numbered folder. That folder's name often has spaces or special characters (e.g. `&`) — always double-quote it in shell commands. Unzip into a scratch subfolder to inspect it first. Udemy zips are frequently nested one level deep (e.g. `01-starting-project/`), so the real app root may not be at the top of the extracted tree — check before assuming paths.

2. **Identify what's course content vs. tooling.** From the extracted app, the following are course content and must be preserved (adapted to current file-naming, not rewritten): `src/app/*.component.ts`/`.html` (or already-renamed `app.ts`/`.html`), `src/main.ts`'s bootstrap call, `src/styles.css`, and whatever's in `public/` (or `src/assets/`) — images, favicon, etc. Everything else (`package.json`, `angular.json`, `tsconfig*.json`, `.gitignore`, `README.md`, `.editorconfig`, `karma.conf.js`, etc.) is disposable tooling from the old CLI version.

3. **Check the target version and conventions against the newest sibling.** Look at the most recently added numbered folder (not this instructions file) for the current `@angular/core` / `@angular/cli` version pinned across the repo, and for which generated files it keeps vs. strips. Conventions observed so far (verify they still hold):
   - Repo root already provides a shared `.editorconfig`, `.prettierrc`, and `README.md` — per-folder copies of these are redundant and get deleted.
   - Repo root also has one root `.gitignore` covering `node_modules/`, `dist/`, `.angular/` etc. — don't keep a per-folder one.
   - At this stage of the course, apps don't use routing or an `app.config.ts` providers file yet, so `ng new`'s default `app.config.ts`, `app.routes.ts`, and the `RouterOutlet` import in `app.ts` get stripped back out — unless the lesson this chapter covers is specifically about routing, in which case keep them.
   - Root `app.ts`/`app.html` normally has no root-level `app.spec.ts` or `app.css` in this repo's sibling folders — confirm against the newest sibling rather than assuming, since a later chapter might reintroduce these deliberately.

4. **Generate a fresh scaffold with the repo's own CLI.** Run `npx ng new <project-name> --directory=<dir> --style=css --skip-git --skip-install --defaults` from the repo root, so it resolves the Angular CLI already pinned there.

   **Sandbox gotcha:** pointing `--directory` at `/tmp/...` or the Claude Code scratchpad directory can silently fail to persist — the CLI reports files as `CREATE`d but they either vanish or get mirrored into a gitignored `tmp/` folder at the repo root instead of the path you asked for. This appears to be a quirk of how the Bash tool sandboxes filesystem writes outside the working directory. Avoid the problem entirely by pointing `--directory` at a throwaway folder *inside* the repo working directory (e.g. `_scaffold_tmp`), then `mv` its contents into the real target folder and remove the temp folder. Whenever a CLI command reports success for a path outside the repo, verify with `ls`/`find` before trusting it — don't take the reported output at face value.

   If `--routing=false` produces a "merge conflicted" error from the schematic engine, don't fight it — generate with default routing on and manually delete `app.config.ts`/`app.routes.ts`/the `RouterOutlet` import afterward (see step 3).

5. **Fix up generated boilerplate to match course style.** `ng new`'s default `app.ts` includes a `signal()`-based title and router imports the course hasn't taught yet at this stage — simplify it back to a plain `@Component` class. `main.ts` should be a plain `bootstrapApplication(App).catch((err) => console.error(err));` with no `appConfig` unless the original zip's `main.ts` already had providers worth keeping. Check `angular.json`'s `$schema` path is correct for the folder's depth (usually `../node_modules/@angular/cli/lib/config/schema.json` for a top-level numbered folder).

6. **Port the course content in.** Copy the preserved component code/markup into the new `app.ts`/`app.html` (renaming from `.component.ts`/`.component.html` to the current convention if needed), copy `styles.css`, and copy assets into the new `public/` folder.

7. **Register the workspace.** Add the new folder path to the `workspaces` array in the root `package.json`, then run `npm install` from the repo root — this updates `package-lock.json` and hoists `node_modules` for the new project without needing a fresh network install if the version matches an existing sibling.

8. **Verify it actually builds.** `cd` into the new folder and run `npx ng build`. Then delete the `dist/` and `.angular/` output it produces (these should already be root-gitignored, but confirm nothing stray landed elsewhere).

9. **Clean up every trace of the import process.** Remove the zip itself, any OS sidecar files (e.g. Windows' `*.zip:Zone.Identifier`), the extracted-but-now-ported source tree, and the `_scaffold_tmp` folder. Specifically check for accidental leftovers in a root-level gitignored `tmp/` directory from the sandbox gotcha in step 4 — this has happened before and is easy to miss because `git status` won't show it.

10. **Final sanity check.** `git status --short` should show only the new numbered folder as untracked, plus the modified root `package.json`/`package-lock.json` — nothing else. Also run `git status --short --ignored` to catch anything hiding in an ignored path.

## Don't commit automatically

Leave the result staged/unstaged for the user to review — don't create a git commit as part of this workflow unless they explicitly ask for one.
