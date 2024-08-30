import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
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
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TaskService } from '../../../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'dialog-update-task',
  templateUrl: 'dialog-update-task.html',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatHint,
    MatLabel,
    MatError,
    MatInput,
  ],
  styleUrl: 'dialog-update-task.component.scss',
  standalone: true,
})
export class DialogUpdateTask {
  readonly data = inject<{ title: string; describe: string; id: string }>(
    MAT_DIALOG_DATA
  );
  readonly dialogRef = inject(MatDialogRef<DialogUpdateTask>);

  constructor(private taskService: TaskService, private toast: ToastrService) {}

  fb = inject(FormBuilder);
  formUpdateTask = this.fb.group({
    titleTask: [this.data.title, Validators.required],
    describeTask: [this.data.describe],
  });

  updateTask() {
    const title = this.formUpdateTask.value.titleTask;
    const description = this.formUpdateTask.value.describeTask;
    if (title != '') {
      this.taskService
        .updateTask(title!, description!, this.data.id)
        .subscribe({
          next: (e) => {
            this.dialogRef.close(e);
          },
          error: () => {
            this.toast.error('Erro ao atualizar a tarefa');
            this.dialogRef.close();
          },
        });
    }
  }
}
