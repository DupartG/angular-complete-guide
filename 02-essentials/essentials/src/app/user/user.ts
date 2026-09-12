import { Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  @Input({required: true}) avatar!: string; //declare value injection from template
  @Input({required: true}) name!: string

  get imagePath() {
    return 'public/' + this.avatar;
  }

  onSelectUser(){

  }
}
