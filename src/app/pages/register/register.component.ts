import { Component, inject } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatCardContent } from '@angular/material/card';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    MatInput,
    MatError,
    MatCardContent,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
  ],
  providers: [UsuarioService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private loginService: UsuarioService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  fb = inject(FormBuilder);

  form = this.fb.group({
    emailFormControl: ['', [Validators.required, Validators.email]],
    senhaFormControl: ['', [Validators.required, Validators.minLength(3)]],
    repetSenhaFormControl: [
      '',
      [
        Validators.required,
        RegisterComponent.validatorPassword('senhaFormControl'),
      ],
    ],
  });

  static validatorPassword(formControl: string) {
    const checkPasswordValidator = (input: FormControl) => {
      if (!input.root || !(<FormGroup>input.root).controls) {
        return null;
      }
      const password = (<FormGroup>input.root).get(formControl)!;

      return input.value == password.value ? null : { checkPassword: true };
    };
    return checkPasswordValidator;
  }

  navRoute() {
    this.router.navigate(['login']);
  }

  register() {
    const login = this.form.value.emailFormControl;
    const password = this.form.value.senhaFormControl;

    if (!login || !password) {
      throw new Error('campo nulo');
    }

    if (this.form.value.repetSenhaFormControl?.toString() == password) {
      this.loginService.register(login, password).subscribe({
        next: () => {
          this.toastr.success('Conta cadastrada com sucesso!');
          this.router.navigate(['']);
        },
        error: (e) => {
          if (e.status == 400) {
            this.toastr.error('Email já cadastrado, tente outro');
          } else {
            this.toastr.error('Erro inesperado, tente novamente mais tarde');
          }
        },
      });
    }
  }
}
