import { Component, EventEmitter, Input, Output } from '@angular/core';
import {IUser} from './user.model'
import { Card } from '../shared/card/card';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.html',
  styleUrl: './user.css',
  imports: [Card],
})
export class User {
  @Input({required: true}) user!: IUser;
  @Input({required: true}) selected!: boolean;
  @Output() select = new EventEmitter<string>(); // declare data output


  get imagePath() {
    return 'users/' + this.user.avatar;
  }

  onSelectUser(){
    this.select.emit(this.user.id);
  }
}
