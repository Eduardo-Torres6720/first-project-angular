import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { IDialogDataDetails } from '../../../../interfaces/IDialogDataDetails';

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
  readonly data = inject<IDialogDataDetails>(MAT_DIALOG_DATA);
}
