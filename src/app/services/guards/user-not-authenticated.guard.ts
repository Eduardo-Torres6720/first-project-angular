import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class userNotAuthenticatedGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url;

    if (this.usuarioService.loggedIn) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
