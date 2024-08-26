import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
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
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { task } from '../../types/task.type';

export interface DialogData {
  title: string;
  describe: string;
  completed: boolean;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatButton,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() title: string = '';
  @Input() describe: string = '';
  @Input() completed: boolean = false;
  @Input() active: boolean = true;
  @Input() id: string = '';
  @Output('deleteTask') onDeleteTask = new EventEmitter();
  @Output('openDialogUpdateTask') onOpenDialogUpdateTask = new EventEmitter();

  readonly dialog = inject(MatDialog);

  deleteTask() {
    this.onDeleteTask.emit();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    title: string,
    describe: string,
    completed: boolean
  ) {
    this.dialog.open(DialogTaskDetails, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: title,
        describe: describe,
        completed: completed,
      },
    });
  }

  openDialogUpdateTask(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    const dialogRef = this.dialog.open(DialogUpdateTask, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title: this.title, describe: this.describe, id: this.id },
    });
    dialogRef.afterClosed().subscribe((result: task) => {
      this.onOpenDialogUpdateTask.emit(result);
    });
  }
}

@Component({
  selector: 'dialog-task-details',
  templateUrl: 'dialog-task-details.html',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTaskDetails {
  readonly dialogRef = inject(MatDialogRef<DialogTaskDetails>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
}

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
  styleUrl: 'task.component.scss',
  standalone: true,
})
export class DialogUpdateTask {
  readonly data = inject<{ title: string; describe: string; id: string }>(
    MAT_DIALOG_DATA
  );
  readonly dialogRef = inject(MatDialogRef<DialogUpdateTask>);

  constructor(private taskService: TaskService) {}

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
        });
    }
  }
}
