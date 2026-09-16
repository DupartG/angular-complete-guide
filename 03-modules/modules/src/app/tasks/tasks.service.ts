import { NewTaskDto } from "./task.model";
import { DUMMY_TASKS } from '../../../public/dummy.tasks';
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TasksService{
    private tasks = DUMMY_TASKS;

    constructor(){
        const tasksLocalStorage = localStorage.getItem('tasks');

        if (tasksLocalStorage) {
            this.tasks = JSON.parse(tasksLocalStorage);
        }
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    getUserTasks(userId: string){
        return this.tasks.filter((task) => task.userId === userId);

    }

    addTask(taskData: NewTaskDto, userId: string){
        this.tasks.unshift(
            {
                id: new Date().getTime().toString(), // good enough for the demo
                userId: userId,
                title: taskData.title,
                summary: taskData.summary,
                dueDate: taskData.date,
            }
        );
        this.saveTasks();
    }

    removeTask(userId: string) {
        this.tasks = this.tasks.filter((task) => task.id !== userId)
        this.saveTasks();        
    }

}