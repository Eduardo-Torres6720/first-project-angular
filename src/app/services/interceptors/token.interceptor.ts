import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsuarioService } from '../usuario.service';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  let token = inject(UsuarioService).getUserToken;
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(req);
};
