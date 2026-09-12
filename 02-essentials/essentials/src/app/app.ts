import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';
import { User } from './user/user';
import { DUMMY_USERS } from '../../public/dummy.users';

@Component({
  imports: [HeaderComponent, User], // This make the header component a branch of app (the root)
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  users = DUMMY_USERS;

  onSelectUser(id: string){
    console.log(id);
  }
}
