import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { CustomValidators } from '@app/validators/validators';

@Component({
  selector: 'cmp-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  f: FormGroup;
  @Input() loading: boolean;

  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToasterService
  ) {}

  ngOnInit() {
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
        currentPassword: [''],
        passwordConfirm: ['', Validators.required]
      },
      { validator: CustomValidators.passwordMatcher }
    );
  }

  update() {
    const { password, passwordConfirm } = this.f.value;
    this.submitted.emit({ password, 'password-confirm': passwordConfirm });
  }

  private _toggleLoading() {
    this.loading = !this.loading;
  }

  private _disableForm() {
    this.f.disable();
  }

  private _enableForm() {
    this.f.enable();
  }

  get password(): AbstractControl {
    return this.f.get('password');
  }
  get passwordConfirm(): AbstractControl {
    return this.f.get('passwordConfirm');
  }

  get currentPassword(): AbstractControl {
    return this.f.get('currentPassword');
  }
  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
