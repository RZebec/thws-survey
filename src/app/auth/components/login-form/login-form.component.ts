import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() sendLoginForm = new EventEmitter<Credentials>();
  public form!: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: this.email,
      // password: this.password,
    });
  }

  public login(): void {
    if (this.form.valid) {
      this.sendLoginForm.emit({
        email: this.form.get('email')!.value,
        // password: this.form.get('password')!.value,
      });
    }
  }
}
