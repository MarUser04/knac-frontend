import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material/core';
import { CustomValidators } from '../../../../validators/validators';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/defer';

import { AuthService } from '../../../../services/auth/auth.service';
import { errorToast, successToast } from '../../../../helpers/helper';

@Component({
  selector: 'st-login-professionals',
  styleUrls: ['login-professionals.component.css'],
  templateUrl: 'login-professionals.component.html',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class LoginProfessionalsComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  f: FormGroup;
  loading: boolean;
  error: any[];
  previous: String = '';

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private toast: ToasterService,
    private route: Router,
    private routeActived: ActivatedRoute
  ) {}

  ngOnInit() {
    this.email = new FormControl('', [
      Validators.required,
      CustomValidators.isEmail
    ]);
    (this.password = new FormControl('', [Validators.required])),
      (this.f = this.builder.group(
        {
          email: this.email,
          password: this.password
        },
        { updateOn: 'submit' }
      ));
    this.routeActived.queryParams.subscribe(params => {
      this.previous = params.previous;
    });
  }

  login() {
    return Observable.defer(() => {
      this._disableForm();
      this._toggleLoading();
      return this.auth.getLoggingIn(this.f.value);
    })
      .finally(() => {
        this._enableForm();
        this._toggleLoading();
      })
      .subscribe({
        next: response => {
          const { user, token } = response.json();
          localStorage.setItem('token', token);
          if (this.previous) {
            this.route.navigate([this.previous]);
          } else {
            this.route.navigate(this._redirectUrl(user));
          }
          this.toast.pop(successToast('you logged in with success!'));
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.toast.pop(errorToast('Password or email incorrect!'));
          } else {
            this.toast.pop(errorToast('Error processing your credentials!'));
          }
        }
      });
  }

  _redirectUrl({ userPermissions }) {
    if (+userPermissions < 10) {
      return new Array('/professional');
    } else if (+userPermissions >= 10 && +userPermissions < 20) {
      return new Array('/company/profile');
    } else if (+userPermissions >= 20) {
      return new Array('/admin/company/list');
    }
  }

  getAuthCode() {
    this.auth.getAuthorizationCode();
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

  get emailLogin(): AbstractControl {
    return this.f.get('email');
  }
  get passwordLogin(): AbstractControl {
    return this.f.get('password');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
