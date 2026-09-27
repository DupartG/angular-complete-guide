import { Routes } from '@angular/router';
import { canLeaveEditPage, NewTask } from './new-task/new-task';
import { Tasks } from './tasks';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks', //<domain>/users/<userId>/tasks
    component: Tasks,
  },
  {
    path: 'tasks/new', //<domain>/users/<userId>/tasks/new
    component: NewTask,
    canDeactivate: [canLeaveEditPage],
  },
];
