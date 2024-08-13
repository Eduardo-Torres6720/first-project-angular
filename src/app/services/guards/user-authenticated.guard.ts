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
export class userAuthenticatedGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.usuarioService.loggedIn) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
