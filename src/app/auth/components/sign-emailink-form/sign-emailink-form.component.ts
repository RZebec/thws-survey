import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpEmailModel } from '../../models/signUpEmailModel';

@Component({
  selector: 'app-sign-emailink-form',
  templateUrl: './sign-emailink-form.component.html',
  styleUrls: ['./sign-emailink-form.component.scss'],
})
export class SignEmailinkFormComponent {
  @Output() sendSignForm = new EventEmitter<SignUpEmailModel>();
  public form!: FormGroup;

  email = new FormControl('', [Validators.required, Validators.email]);

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: this.email,
    });
  }

  public sign(): void {
    if (this.form.valid) {
      this.sendSignForm.emit({
        email: this.form.get('email')!.value,
      });
    }
  }
}
