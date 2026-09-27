import { Component, computed, input } from '@angular/core';

import { type IUser } from './user.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.css',
  imports: [RouterLink, RouterLinkActive],
})
export class User {
  user = input.required<IUser>();

  imagePath = computed(() => 'users/' + this.user().avatar);
}
