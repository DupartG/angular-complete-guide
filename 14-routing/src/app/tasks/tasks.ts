import { Component } from '@angular/core';

import { Task } from './task/task';
import { ITask } from './task/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  imports: [Task],
})
export class Tasks {
  userTasks: ITask[] = [];
}
