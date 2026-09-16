This chapter is about modules. Previously we work with standalone components, but enterprise often work with older versions anterior to the 19, and hence use modules. So the application in this subfolder is the same as the one in the 02-essentials, but with module design.

The main idea is instead of declaring wich components are contained inside another, you declare a module 

In 19+, components are standalone by default. In prior version its the opposite

Only standalone components can imports other components. Modules MUST declare which components they export too

Modules are the implementation of packaging.