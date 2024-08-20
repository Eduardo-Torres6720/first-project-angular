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
  @Output('deleteTask') onDeleteTask = new EventEmitter();

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
      data: { title: title, describe: describe, completed: completed },
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
