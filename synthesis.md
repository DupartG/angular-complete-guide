# angular-complete-guide

## DOM update
How Angular knows when to update the DOM:
- With ZoneJS (still the default in most apps): Zone.js monkey-patches all async browser APIs (setTimeout, Promise, fetch/XHR, addEventListener...). When any async operation completes, Angular doesn't know what changed, so it walks the whole component tree and compares each binding against its previous value to update the DOM. Heavy, coarse-grained process.
- Signals (introduced in v16) are reactive values that track their own consumers. Reading a signal in a template/computed/effect registers that consumer as a dependent; writing the signal notifies exactly those dependents, which then update. Fine-grained and lighter than ZoneJS, and it's what enables zoneless.

Since signals, there are essentially two ways of writing Angular code, and they can be mix: legacy code work with zone, and more recent one can work signals. This means both implementation must be known !

## Architecture
In the same way, modules and standalone components are two ways to design the application and both can coexist:
- Modules are a packaging feature, they enable accessibility of the components used (declare/imports/exports).
- Standalone components are the modern way, they allow components to be imported one inside another. They are much less boilerplate than modules.

In both design, a good practice is to separate "dumb" and "smart" components. Smart components hold state, orchestrate,  and delegate actual business logic to services. Dumb components only receive or display data, they hold no state and no logic.