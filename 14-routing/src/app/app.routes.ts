import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NoTask } from './tasks/no-task/no-task';
import { resolveTitle, resolveUserName, UserTasks } from './users/user-tasks/user-tasks';
import { NotFound } from './not-found/not-found';
import { routes as tasksRoutes } from './tasks/tasks.routes';
import { UsersService } from './users/users.service';

const guardDemoFunction: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const usersService = inject(UsersService);
  const userId = segments[1]?.path; // 'users/:userId' -> segments = ['users', '<userId>']
  const grantedAccess = usersService.users.some((user) => user.id === userId);
  if (grantedAccess) return true;
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '', // <domain>/
    component: NoTask,
  },
  {
    path: 'users/:userId', //<domain>/users/<userId>
    component: UserTasks,
    canMatch: [guardDemoFunction],
    children: tasksRoutes,
    data: {
      message: 'Hello',
    },
    title: resolveTitle,
    resolve: {
      userName: resolveUserName,
    },
  },
  {
    path: '**', //fallback route
    component: NotFound,
  },
];
