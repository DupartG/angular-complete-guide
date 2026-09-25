import { Component } from '@angular/core';

import { Header } from './header/header';
import { Users } from './users/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Header, Users],
})
export class App {}
