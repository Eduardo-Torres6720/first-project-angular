import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TaskComponent } from '../../../../components/task/task.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { TaskService } from '../../../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { task } from '../../../../types/task.type';
import { IDialogDataBin } from '../../../../interfaces/IDialogDataBin';

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
  styleUrl: 'dialog-bin.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBin {
  readonly dialogRef = inject(MatDialogRef<DialogBin>);
  readonly data = inject<IDialogDataBin>(MAT_DIALOG_DATA);

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
      if (this.data.tasks.includes(task)) {
        idTasks.push({ id: task.id });
        task.active = true;
      }
    });
    if (idTasks.length <= 0) {
      this.toast.error('Nenhuma tarefa foi restaurada');
    } else {
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

  deleteTaskForever(task: task) {
    const index = this.data.tasks.indexOf(task);
    this.data.tasks.splice(index, 1);
    this.taskService.deleteTask(task.id).subscribe({
      error: () => {
        this.toast.error(
          'Erro ao excluir tarefa da lixeira, tente novamente mais tarde'
        );
      },
    });
  }
}
