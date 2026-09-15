# angular-complete-guide PART 2
One Angular application = One Component tree
=>  there is the root component (app component), than branches and leaves.
Components are made to be reusable chunks and combine together.


ng g(enerate) c(component) <name> -> generate a folder for a component

String interpolation: {{}} 
Property binding : [attributeName] on a markup PROPERTY
Add a listener on an event: (<event>)
two way binding: [(directive)]="attribute" inside a markup

@for <=> *ngFor
@if <=> *ngIf + else with ng-template

Parent component input data to their children and children component output event to their parent

DI : constructor vs inject() <=> old way vs new