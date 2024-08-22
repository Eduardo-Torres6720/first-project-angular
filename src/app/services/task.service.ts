import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';
import { task } from '../types/task.type';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url: string = 'http://localhost:8080/tasks/';

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  getTasks(): Observable<task[]> {
    const userId: string = this.usuarioService.getId()!;
    return this.httpClient.get<task[]>(this.url + 'user/' + userId);
  }

  addNewTask(title: string, description: string): Observable<task> {
    const userId: string = this.usuarioService.getId()!;
    return this.httpClient.post<task>(
      this.url + 'user/' + userId + '/addTask',
      {
        title,
        description,
      }
    );
  }

  deleteTask(id: string) {
    return this.httpClient.delete(this.url + 'delete/' + id);
  }

  getDeletedTasks(): Observable<task[]> {
    const userId: string = this.usuarioService.getId()!;
    return this.httpClient.get<task[]>(this.url + 'deletedTask/user/' + userId);
  }
}
