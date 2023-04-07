import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

@Directive({
  selector: '[checkPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CheckPasswordValidator,
      multi: true,
    },
  ],
})
export class CheckPasswordValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.parent) {
      const c = (control.parent?.controls as any)[
        'password'
      ] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return control.value === c.value ? null : { notSame: true };
    }
    return null;
  }
}

export function matchValidator(
  matchTo: string,
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value
      ? null
      : { notSame: true };
  };
}
