import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url: string = 'http://localhost:8080/tasks/';

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  getTasks(): Observable<any> {
    const userId: string = this.usuarioService.getId()!;
    return this.httpClient.get(this.url + 'user/' + userId);
  }
}
