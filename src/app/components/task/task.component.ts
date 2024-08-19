import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
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
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() title: string = '';
  @Input() describe: string = '';
  @Input() completed: boolean = false;

  readonly dialog = inject(MatDialog);

  titleTaskSelected: string = '';
  describeTaskSelected: string = '';

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
