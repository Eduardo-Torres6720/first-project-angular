import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { UsuarioService } from '../usuario.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let usuarioService = inject(UsuarioService);
  let toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status)) {
        usuarioService.logOut();
        toastr.error('Usuario não autenticado');
      }
      return throwError(() => err);
    })
  );
};
