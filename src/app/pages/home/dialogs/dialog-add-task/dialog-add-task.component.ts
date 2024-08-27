import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatHint,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { TaskService } from '../../../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'dialog-add-task',
  templateUrl: 'dialog-add-task.html',
  styleUrl: 'dialog-add-task.component.scss',
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

  constructor(private taskService: TaskService, private toast: ToastrService) {}

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
          this.toast.success('tarefa adicionada com sucesso');
        },
        error: (e) => {
          console.log(e.message);
        },
      });
    }
  }
}
