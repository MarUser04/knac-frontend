import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule, FormGroup, AbstractControl } from '@angular/forms';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {RouterModule, Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSpinKitModule } from 'ng-spin-kit';
import { ToasterModule } from 'angular2-toaster';

import {CustomValidators} from './validators';
import {RegisterProfessionalsComponent} from '../components/site/register/register-professionals/register-professionals.component';
import {AuthService} from '../services/auth/auth.service';
import {SiteStorageService} from '../services/siteStorage/site-storage.service';
import {ErrorMessageComponent} from '../components/shared/error-message/error-message.component';

describe('CustomValidators testing', () => {

  let component: RegisterProfessionalsComponent;
  let fixture: ComponentFixture<RegisterProfessionalsComponent>;
  let f: FormGroup;
  let password: AbstractControl;
  let passwordConfirm: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule, RouterModule, NgSpinKitModule, ToasterModule.forRoot()],
      declarations: [RegisterProfessionalsComponent, ErrorMessageComponent],
      providers: [AuthService, SiteStorageService, HttpClient, HttpHandler]
    });

    fixture = TestBed.createComponent(RegisterProfessionalsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    f = component.f;
    password = component.f.controls['password'];
    password.setValue('Test123*');

    passwordConfirm = component.f.controls['passwordConfirm'];
    passwordConfirm.setValue('Test123*');
  });

  it('password confirm test', () => {
    expect(CustomValidators.passwordMatcher(f)).toBe(null);
  });

  it('password must have a number', () => {
    expect(CustomValidators.passwordNumber(password)).toBe(null);
  });

  it('password must have a uppercase letter', () => {
    expect(CustomValidators.passwordUpper(password)).toBe(null);
  });

  it('password must have a lowercase letter', () => {
    expect(CustomValidators.passwordLower(password)).toBe(null);
  });

  it('password must have a symbol', () => {
    expect(CustomValidators.passwordCharacter(password)).toBe(null);
  });

  it('password not must have spaces', () => {
    expect(CustomValidators.passwordSpaces(password)).toBe(null);
  });
});
