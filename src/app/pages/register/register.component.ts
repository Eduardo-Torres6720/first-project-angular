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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fb = inject(FormBuilder);

  form = this.fb.group({
    emailFormControl: ['', [Validators.required, Validators.email]],
    senhaFormControl: ['', [Validators.required, Validators.minLength(3)]],
    repetSenhaFormControl: [
      '',
      [Validators.required, this.checkPasswordValidator],
    ],
  });

  // static equalsTo(otherPassword: string) {
  //   const checkPasswordValidator = (formControl: FormControl) => {
  //     if (otherPassword == null) {
  //       throw new Error("É necessário informar um campo")
  //     }
  //     const field = (<FormGroup>)
  //   }
  // }

  checkPasswordValidator(input: FormControl) {
    if (!input.root || !(<FormGroup>input.root).controls) {
      return null;
    }
    const password = (<FormGroup>input.root).get('senhaFormControl')!;

    return input.value == password.value ? null : { checkPassword: true };
  }

  register() {
    console.log(this.form.value.senhaFormControl);
    console.log(this.form.value.repetSenhaFormControl);
  }
}
