import { Component, computed, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  @Input({required: true}) id!: string;
  @Input({required: true}) avatar!: string; //declare value injection from template
  @Input({required: true}) name!: string
  @Output() select = new EventEmitter<string>(); // declare data output


  get imagePath() {
    return 'users/' + this.avatar;
  }

  onSelectUser(){
    this.select.emit(this.id);
  }
}
