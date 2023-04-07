import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Credentials } from 'src/app/models/credentials';
import { SignUpModel } from '../../models/signUpModel';
import {
  matchValidator,
  CheckPasswordValidator,
} from '../../pipes/checkPassword.validator';
import { ErrorStateMatcher } from '../../pipes/errorStateMatcher';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.scss'],
})
export class SignFormComponent implements OnInit {
  @Output() sendSignForm = new EventEmitter<SignUpModel>();
  public form!: FormGroup;

  firstName = new FormControl('', [Validators.required]);

  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=\[\]{}|‘])[A-Za-z\d!@#$%^&*()_+-=\[\]{}|‘]{10,}$/
    ),
  ]);

  passwordRepeat = new FormControl('', [
    Validators.required,
    new CheckPasswordValidator().validate,
  ]);

  matcher = new ErrorStateMatcher();

  public ngOnInit(): void {
    this.form = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      passwordRepeat: this.passwordRepeat,
    });
  }

  public sign(): void {
    if (this.form.valid) {
      this.sendSignForm.emit({
        firstName: this.form.get('firstName')!.value,
        lastName: this.form.get('lastName')!.value,
        email: this.form.get('email')!.value,
        password: this.form.get('password')!.value,
      });
    }
  }
}
