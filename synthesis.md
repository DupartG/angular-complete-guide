# angular-complete-guide
How Angular knows when to update the DOM:
- With ZoneJS (still the default in most apps): Zone.js monkey-patches all async browser APIs (setTimeout, Promise, fetch/XHR, addEventListener...). When any async operation completes, Angular doesn't know what changed, so it walks the whole component tree and compares each binding against its previous value to update the DOM. Heavy, coarse-grained process.
- Signals (introduced in v16) are reactive values that track their own consumers. Reading a signal in a template/computed/effect registers that consumer as a dependent; writing the signal notifies exactly those dependents, which then update. Fine-grained and lighter than ZoneJS, and it's what enables zoneless.

Since signals, there are essentially two ways of writing Angular code, and they can be mix: legacy code work with zone, and more recent one can work signals. This means both implementation must be known !
