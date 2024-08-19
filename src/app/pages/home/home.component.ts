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
      if (result !== undefined) {
        this.tasks.push(result);
      }
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
