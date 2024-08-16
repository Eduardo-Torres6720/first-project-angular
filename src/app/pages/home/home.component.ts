import { Component } from '@angular/core';
import { TaskComponent } from '../../components/task/task.component';
import { TaskService } from '../../services/task.service';
import { task } from '../../types/task.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  tasks: task[] = [];
  constructor(private tasksService: TaskService) {
    this.tasksService.getTasks().subscribe({
      next: (e) => {
        this.tasks = e;
      },
      error: (e) => {
        console.log(e.message);
      },
    });
  }
}
