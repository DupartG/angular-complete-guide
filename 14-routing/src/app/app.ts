import { Component } from '@angular/core';

import { Header } from './header/header';
import { Users } from './users/users';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Header, Users, RouterOutlet],
})
export class App {}
