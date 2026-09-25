import { Component, computed, input } from '@angular/core';

import { type IUser } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  user = input.required<IUser>();

  imagePath = computed(() => 'users/' + this.user().avatar);
}
