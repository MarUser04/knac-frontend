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
} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import * as fromAssessment from '@app/shared/reducers';
import * as TrackActions from '@app/shared/actions/track.actions';
import * as skillActions from '@app/modules/professional/actions/skill.actions';
import * as fromSkills from '@app/modules/professional/reducers';
import { Skill } from '@app/modules/professional/models/skill';

import { ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/defer';

import { CustomValidators } from '@app/validators/validators';
import { AuthService } from '@app/services/auth/auth.service';
import {
  errorToast,
  successToast,
  warnToast,
  infoToast,
  bodyParser,
  readUploadedFileAsDataURL
} from '@app/helpers/helper';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { Track } from '@app/shared/models/track';

@Component({
  selector: 'prf-profile',
  styleUrls: ['profile-professional.component.css'],
  templateUrl: 'profile-professional.component.html',
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ]
})
export class ProfileProfessionalComponent implements OnInit {

  f: FormGroup;
  base64textString: any;
  whatIsThisText = 'Describe yourself...';
  position = 'above';
  photo = true;
  profilePicture: File;
  loading: boolean;
  // textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-]+$/;
  textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\'\s\-]+$/;

  tracks$: Observable<Track>;
  skills$: Observable<any>;
  availabilitys = ['Full time', 'Part time', 'Contractor'];
  educations = [
    'High School',
    'Some college',
    'Associates',
    'Bachelors degree',
    'Masters degree',
    'PhD',
    'Bootcamp',
    'Self-taught'
  ];

  experienceLevels = ['Beginner', 'Intermediate', 'Experienced', 'Advanced'];

  constructor(
    private builder: FormBuilder,
    private auth: AuthService,
    private message: HandleErrorService,
    private toast: ToasterService,
    private router: Router,
    private store: Store<fromAssessment.State>
  ) {
    store.dispatch(new skillActions.GetSkills());
    store.dispatch(new TrackActions.GetTrackList());
    this.tracks$ = store.pipe(select(fromAssessment.getTrackList));
    this.skills$ = store.pipe(select(fromSkills.getSkills));
    this.f = this.builder.group({
      photo: [''],
      name: ['', [Validators.required, Validators.pattern(this.textPattern)]],
      lastName: [
        '',
        [Validators.required, Validators.pattern(this.textPattern)]
      ],
      track: [null, Validators.required],
      skills: [null, Validators.required],
      websiteUrl: ['', CustomValidators.isUrl],
      subtitle: ['', Validators.required],
      resume: [''],
      description: [''],
      availability: [null, Validators.required],
      location: ['', Validators.required],
      superpowers: ['', Validators.required],
      education: [null, Validators.required],
      experience: ['', Validators.required],
      experienceLevel: [null, Validators.required],
      contactInformation: [
        '',
        [
          CustomValidators.isNumber,
          Validators.maxLength(20),
          Validators.minLength(10)
        ]
      ]
    });
  }

  static validateFileUpload(e) {
    if (e && e.target && e.target.files) {
      const fileList = e.target.files;
      return fileList.item(fileList.length - 1);
    } else {
      return null;
    }
  }

  ngOnInit() {}

  createProfile() {
    return Observable.defer(() => {
      this._disableForm();
      this._toggleLoading();
      const {
        name,
        lastName,
        websiteUrl,
        resume,
        description,
        track,
        skills,
        subtitle,
        availability,
        location,
        superpowers,
        education,
        experience,
        experienceLevel,
        contactInformation
      } = this.f.value;
      const payload = {
        name,
        lastName,
        websiteUrl,
        description,
        resume,
        profilePicture: this.profilePicture || '',
        track,
        skills,
        subtitle,
        availability,
        location,
        superpowers,
        education,
        experience,
        experienceLevel,
        contactInformation
      };
      const data = bodyParser(payload);
      return this.auth.buildProfile(data);
    })
      .finally(() => {
        this._enableForm();
        this._toggleLoading();
      })
      .subscribe({
        next: resp => {
          this.toast.pop(successToast('you built your profile with success!'));
          this.router.navigate(['/professional']);
        },
        error: (err: HttpErrorResponse) => {
          const { error } = err;
          this.message.showAlertMssg(error);
        }
      });
  }

  private _toggleLoading() {
    this.loading = !this.loading;
  }

  private _enableForm() {
    this.f.enable();
  }

  private _disableForm() {
    this.f.disable();
  }

  setValue(e, name) {
    this.f.get(name).setValue(e.target.value);
  }

  delete(name) {
    this.f.get(name).setValue('');
  }

  openFileBrowser(e, name) {
    e.preventDefault();

    const element: HTMLElement = document.getElementById(name) as HTMLElement;
    element.click();
  }

  onFileChange(e, name) {
    const file = ProfileProfessionalComponent.validateFileUpload(e);
    if (file.type === 'application/pdf') {
      this.f.get(name).setValue(file);
    } else {
      this.toast.pop(warnToast('Please, select a PDF file!'));
    }
  }

  openFileBrowserAsPhoto(e) {
    e.preventDefault();
    const element: HTMLElement = document.getElementById(
      'photo'
    ) as HTMLElement;
    element.click();
  }

  async onFileChangePhoto(e) {
    const file = ProfileProfessionalComponent.validateFileUpload(e);
    this.f.get('photo').setValue(file);
    this.profilePicture = file;
    try {
      this.base64textString = await readUploadedFileAsDataURL(file);
    } catch (e) {
      this.toast.pop(warnToast(e.message));
    }
  }

  get fileName() {
    const file = this.f.get('resume').value;
    return file ? file.name : '';
  }

  get descriptionLength() {
    return this.f.get('description').value.length;
  }

  get name(): AbstractControl {
    return this.f.get('name');
  }
  get lastName(): AbstractControl {
    return this.f.get('lastName');
  }
  get track(): AbstractControl {
    return this.f.get('track');
  }
  get skills(): AbstractControl {
    return this.f.get('skills');
  }
  get websiteUrl(): AbstractControl {
    return this.f.get('websiteUrl');
  }
  get portfolioFile(): AbstractControl {
    return this.f.get('portfolioFile');
  }
  get resume(): AbstractControl {
    return this.f.get('resume');
  }
  get description(): AbstractControl {
    return this.f.get('description');
  }

  get subtitle(): AbstractControl {
    return this.f.get('subtitle');
  }

  get availability(): AbstractControl {
    return this.f.get('availability');
  }

  get location(): AbstractControl {
    return this.f.get('location');
  }

  get superpowers(): AbstractControl {
    return this.f.get('superpowers');
  }
  get education(): AbstractControl {
    return this.f.get('education');
  }

  get experience(): AbstractControl {
    return this.f.get('experience');
  }

  get experienceLevel(): AbstractControl {
    return this.f.get('experienceLevel');
  }

  get contactInformation(): AbstractControl {
    return this.f.get('contactInformation');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
