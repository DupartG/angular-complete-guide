import { Component, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {
  RouterOutlet,
  RouterLinkWithHref,
  ResolveFn,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.html',
  styleUrl: './user-tasks.css',
  imports: [RouterOutlet, RouterLinkWithHref],
})
export class UserTasks implements OnInit {
  userId = input.required<string>(); //bind with dynamic path naming
  userName = input.required<string>(); //injected by resolveUserName
  message = input.required<string>(); // injected by static data in the routes declaration
  private activatedRoute = inject(ActivatedRoute); //other way to retrieve data from routes

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      console.log(data);
    });
  }
}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot) => {
  const usersService = inject(UsersService);
  const user = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'));
  const userName = user?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (activatedRoute, routerState) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
