import { Component } from '@angular/core';

import { Login } from './auth/login/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Login],
})
export class App {}
