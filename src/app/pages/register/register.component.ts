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
  constructor(private loginService: UsuarioService) {}

  fb = inject(FormBuilder);

  form = this.fb.group({
    emailFormControl: ['', [Validators.required, Validators.email]],
    senhaFormControl: ['', [Validators.required, Validators.minLength(3)]],
    repetSenhaFormControl: [
      '',
      [Validators.required, this.checkPasswordValidator],
    ],
  });

  checkPasswordValidator(input: FormControl) {
    if (!input.root || !(<FormGroup>input.root).controls) {
      return null;
    }
    const password = (<FormGroup>input.root).get('senhaFormControl')!;

    return input.value == password.value ? null : { checkPassword: true };
  }

  register() {
    const login = this.form.value.emailFormControl;
    const password = this.form.value.senhaFormControl;

    if (!login || !password) {
      throw new Error('campo nulo');
    }

    this.loginService.register(login, password).subscribe({
      next: () => console.log('sucesso!'),
      error: () => console.log('erro ao cadastrar'),
    });
  }
}
