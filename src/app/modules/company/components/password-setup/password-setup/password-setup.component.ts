import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { CustomValidators } from '@app/validators/validators';

@Component({
  selector: 'cmp-password-setup',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './password-setup.component.html',
  styleUrls: ['./password-setup.component.css']
})
export class PasswordSetupComponent implements OnInit {
  public pending: boolean;

  @Input()
  set disabled(isPending: boolean) {
    if (isPending) {
      this.pending = true;
      this.f.disable();
    } else {
      this.pending = false;
      this.f.enable();
    }
  }
  @Output() submitted = new EventEmitter<any>();

  f: FormGroup;

  constructor(private builder: FormBuilder) {
    this.f = this.builder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
            CustomValidators.passwordNumber,
            CustomValidators.passwordUpper,
            CustomValidators.passwordLower,
            CustomValidators.passwordCharacter,
            CustomValidators.passwordSpaces
          ]
        ],
        passwordConfirm: ['', Validators.required]
      },
      { validator: CustomValidators.passwordMatcher }
    );
  }

  ngOnInit() {}

  setup() {
    this.submitted.emit(this.f.value);
  }

  get password(): AbstractControl {
    return this.f.get('password');
  }
  get passwordConfirm(): AbstractControl {
    return this.f.get('passwordConfirm');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }

  inputHasErrorPassword(input: AbstractControl, submitted: boolean) {
    return input.errors.required !== null && input.dirty;
  }
}
