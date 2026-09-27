import { Component, computed, inject, input } from '@angular/core';

import { Task } from './task/task';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  imports: [Task],
})
export class Tasks {
  userId = input.required<string>();
  private tasksService = inject(TasksService);
  userTasks = computed(() =>
    this.tasksService.allTasks().filter((task) => task.userId === this.userId()),
  );
}
