import { Component, Input } from '@angular/core';
import { Task } from './task/task';
import { NewTask } from './new-task/new-task';
import { NewTaskDto } from './task.model';
import { TasksService } from './tasks.service';



@Component({
  selector: 'app-tasks',
  imports: [Task, NewTask],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  @Input({required: true}) name!: string;
  @Input({required: true}) userId!: string;
  isAddingTask = false;

  constructor(private taskServices: TasksService) {} //Allow DI. 


  get selectedUserTasks(){
    return this.taskServices.getUserTasks(this.userId);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
