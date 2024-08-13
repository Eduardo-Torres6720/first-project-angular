import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/shared/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { userNotAuthenticatedGuard } from './services/guards/user-not-authenticated.guard';
import { userAuthenticatedGuard } from './services/guards/user-authenticated.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [userNotAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [userNotAuthenticatedGuard],
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [userAuthenticatedGuard],
    children: [{ path: '', component: HomeComponent }],
  },
];
