import { Component, inject } from '@angular/core';

import { User } from './user/user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  styleUrl: './users.css',
  imports: [User],
})
export class Users {
  private usersService = inject(UsersService);
  users = this.usersService.users;
}
