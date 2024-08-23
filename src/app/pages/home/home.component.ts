import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskComponent } from '../../components/task/task.component';
import { TaskService } from '../../services/task.service';
import { task } from '../../types/task.type';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatHint,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { MatCheckbox } from '@angular/material/checkbox';

export interface DialogData {
  tasks: {
    title: string;
    description: string;
    completed: boolean;
    id: string;
  }[];
}

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
        console.log(e.message);
      },
    });
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id).subscribe({
      next: () => {
        this.deletedTasks.push(
          this.tasks.find((task) => {
            return task.id === id;
          })!
        );
        const index = this.tasks.indexOf(
          this.deletedTasks[this.deletedTasks.length - 1]
        );
        this.tasks.splice(index, 1);
      },
      error: () => {
        this.toast.error(
          'Erro ao deletar a tarefa, tente novamente mais tarde'
        );
      },
    });
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
            console.log(result);
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

@Component({
  selector: 'dialog-add-task',
  templateUrl: 'dialog-add-task.html',
  styleUrl: 'home.component.scss',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatButtonModule,
    FormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    MatError,
    ReactiveFormsModule,
    MatHint,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddTask {
  readonly dialogRef = inject(MatDialogRef<DialogAddTask>);

  constructor(private taskService: TaskService) {}

  fb = inject(FormBuilder);

  formAddTask = this.fb.group({
    titleTask: ['', Validators.required],
    describeTask: [''],
  });

  addTask() {
    const describe = this.formAddTask.get('describeTask')?.value!;
    const title = this.formAddTask.get('titleTask')?.value!;
    if (title != '') {
      this.taskService.addNewTask(title, describe).subscribe({
        next: (e) => {
          this.dialogRef.close(e);
        },
        error: (e) => {
          console.log(e.message);
        },
      });
    }
  }
}

@Component({
  selector: 'dialog-bin',
  templateUrl: 'dialog-bin.html',
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatDialogContent,
    MatButtonModule,
    TaskComponent,
    MatCheckbox,
  ],
  styleUrl: 'home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBin {
  readonly dialogRef = inject(MatDialogRef<DialogBin>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  constructor(private taskService: TaskService, private toast: ToastrService) {}

  rescueTasks: task[] = [];

  updateRescueTasks(task: task) {
    const index = this.rescueTasks.indexOf(task);
    if (index < 0) {
      this.rescueTasks.push(task);
    } else {
      this.rescueTasks.splice(index, 1);
    }
  }

  tasksRescue() {
    const idTasks: { id: string }[] = [];
    this.rescueTasks.forEach((task) => {
      idTasks.push({ id: task.id });
    });
    this.taskService.retrieveTasks(idTasks).subscribe({
      next: () => {
        this.dialogRef.close(this.rescueTasks);
        this.toast.success('Tarefas recuperadas');
      },
      error: () => {
        this.toast.error(
          'Erro ao recuperar tarefas, tente novamente mais tarde'
        );
      },
    });
  }
}
