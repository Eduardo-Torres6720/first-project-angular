import { Component, inject } from '@angular/core';
import { TaskComponent } from '../../components/task/task.component';
import { TaskService } from '../../services/task.service';
import { task } from '../../types/task.type';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogAddTask } from './dialogs/dialog-add-task/dialog-add-task.component';
import { DialogBin } from './dialogs/dialog-bin/dialog-bin.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TaskComponent, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);

  tasks: task[] = [];
  deletedTasks: task[] = [];
  constructor(private tasksService: TaskService, private toast: ToastrService) {
    this.tasksService.getTasks().subscribe({
      next: (e) => {
        this.tasks = e;
      },
      error: (e) => {
        toast.error('Erro ao retornar as tarefas');
      },
    });
  }

  deleteTask(task: task) {
    this.tasksService.deleteTask(task.id).subscribe({
      next: () => {
        this.deletedTasks.push(task);
        const index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
      },
      error: () => {
        this.toast.error(
          'Erro ao deletar a tarefa, tente novamente mais tarde'
        );
      },
    });
  }

  completeTask($event: { id: string; completed: boolean }) {
    this.tasksService.completeTask($event.id).subscribe({
      next: () => {
        this.tasks.find((task) => {
          if (task.id == $event.id) {
            task.completed = !task.completed;
          }
        });
      },
    });
  }

  updateTask(newTask: task) {
    if (newTask) {
      this.tasks.find((value) => {
        if (value.id == newTask.id) {
          value.title = newTask.title;
          value.description = newTask.description;
        }
      });
    }
  }

  openDialogAddTask(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(DialogAddTask, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== '') {
        this.tasks.push(result);
      }
    });
  }

  openDialogBin(enterAnimationDuration: string, exitAnimationDuration: string) {
    this.tasksService.getDeletedTasks().subscribe({
      next: (e) => {
        this.deletedTasks = e;
        const dialogRef = this.dialog.open(DialogBin, {
          width: '500px',
          enterAnimationDuration,
          exitAnimationDuration,
          data: { tasks: this.deletedTasks },
        });
        dialogRef.afterClosed().subscribe((result: task[]) => {
          if (result != undefined && result.length > 0) {
            result.forEach((task) => {
              this.tasks.push(task);
            });
          }
        });
      },
      error: (e) => {
        this.toast.error('Falha ao retornar as tarefas deletadas');
      },
    });
  }
}
