import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type ITask } from './task.model';
import { Card } from '../../shared/card/card';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.html',
  styleUrl: './task.css',
  imports: [DatePipe, Card],
})
export class Task {
  task = input.required<ITask>();
  private tasksService = inject(TasksService);

  onComplete() {
    this.tasksService.removeTask(this.task().id);
  }
}
