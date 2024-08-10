import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url: string = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient) {}

  login(login: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(this.url + '/login', {
        login,
        password,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
        })
      );
  }

  register(login: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(this.url + '/register', {
        login,
        password,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
        })
      );
  }
}
