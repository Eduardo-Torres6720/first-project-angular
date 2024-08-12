import { Component, inject } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardContent } from '@angular/material/card';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UsuarioService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private loginService: UsuarioService,
    private toastr: ToastrService
  ) {}

  fb = inject(FormBuilder);

  form = this.fb.group({
    emailFormControl: ['', [Validators.required, Validators.email]],
    senhaFormControl: ['', [Validators.required, Validators.minLength(3)]],
  });

  logar() {
    const login = this.form.value.emailFormControl;
    const password = this.form.value.senhaFormControl;

    if (!login || !password) {
      throw new Error('codigo escrito errado');
    }

    this.loginService.login(login, password).subscribe({
      next: () => this.toastr.success('Login realizado com sucesso!'),
      error: (e) => {
        if (e.status == 400) {
          this.toastr.error('Login ou senha incorreto(s)');
        } else {
          this.toastr.error('Erro inesperado, tente novamente mais tarde');
        }
      },
    });
  }
}
