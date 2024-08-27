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
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { task } from '../../types/task.type';
import { DialogTaskDetails } from './dialogs/dialog-task-details/dialog-task-details.component';
import { DialogUpdateTask } from './dialogs/dialog-update-task/dialog-update-task.component';

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
  @Output('completeTask') onCompleteTask = new EventEmitter();

  readonly dialog = inject(MatDialog);

  deleteTask() {
    this.onDeleteTask.emit();
  }

  completeTask() {
    this.onCompleteTask.emit({ id: this.id, completed: this.completed });
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
