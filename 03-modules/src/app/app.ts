import { Component } from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';

@Component({
  selector: 'app-root',
  standalone: false, // must be explicit: since Angular 19, omitting this defaults to true
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  users = DUMMY_USERS;
  selectedUserId?: string;

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId);
  }

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }
}
