import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from '@angular/forms';

import { Profile } from '../../../../models/profile';
import { CustomValidators } from '@app/validators/validators';
import { Track } from '@app/shared/models/track';
import { ToasterService } from 'angular2-toaster/src/toaster.service';
import { warnToast, readUploadedFileAsDataURL } from '@app/helpers/helper';
import { Skill } from '@app/modules/professional/models/skill';

@Component({
  selector: 'update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit, OnChanges {
  @Input() profile: any;
  @Input() tracks: Track[];
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
  @Input() skills: Skill[];

  @Output() submitted = new EventEmitter<Profile>();

  pending: boolean;
  f: FormGroup;
  whatIsThisText = 'Describe yourself...';
  position = 'above';
  profilePictureUrl: any;
  textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\'\s\-]+$/;
  profilePictureFile: File;
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

  constructor(private builder: FormBuilder, private toast: ToasterService) {
    this.f = this.builder.group({
      photo: [''],
      name: ['', [Validators.required, Validators.pattern(this.textPattern)]],
      lastName: [
        '',
        [Validators.required, Validators.pattern(this.textPattern)]
      ],
      skills: ['', Validators.required],
      websiteUrl: [null, CustomValidators.isUrl],
      portfolioFile: [''],
      resume: [''],
      description: [''],
      track: [null],
      availability: [null, Validators.required],
      subtitle: ['', Validators.required],
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

  ngOnChanges(): void {
    if (this.profile.profile) {
      const {
        // description,
        lastName,
        name,
        profilePicture,
        websiteUrl,
        track,
        skills,
        subtitle,
        availability,
        location,
        superpowers,
        education,
        experience,
        experienceLevel,
        resume,
        contactInformation
      } = this.profile.profile;
      this.f.patchValue({
        photo: '',
        name: name,
        lastName: lastName,
        skill: '',
        websiteUrl: websiteUrl || '',
        portfolioFile: '',
        resume: resume || '',
        // description,
        track: (track && track._id) || '',
        skills: skills || '',
        subtitle: subtitle || '',
        availability: availability || '',
        location: location || '',
        superpowers: superpowers || '',
        education: education ? education.split(',') : '',
        experience: experience || '',
        experienceLevel: experienceLevel || '',
        contactInformation: contactInformation || ''
      });
      this.setProfilePhoto(profilePicture);
    }
  }

  updateProfile() {
    const {
      name,
      lastName,
      websiteUrl,
      portfolioFile,
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
      portfolioFile, // to be connected
      description,
      resume: resume,
      profilePicture: this.profilePictureFile || this.profilePictureUrl || '',
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
    if (this.f.valid) {
      this.submitted.emit(payload);
    }
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
    const files = e.target.files;
    if (files[0].type === 'application/pdf') {
      this.f.get(name).setValue(files[0]);
    } else {
      this.toast.pop(
        warnToast('Wrong file extension. Please, select a correct file!')
      );
    }
  }

  async onFileChangePhoto(e) {
    const file = UpdateProfileComponent.validateFileUpload(e);
    this.f.get('photo').setValue(file);
    this.profilePictureFile = file;

    try {
      this.profilePictureUrl = await readUploadedFileAsDataURL(file);
    } catch (e) {
      this.toast.pop(warnToast(e.message));
    }
  }

  setProfilePhoto(photo) {
    this.profilePictureUrl = photo;
  }

  get profilePhoto() {
    return this.profilePictureUrl;
  }

  get descriptionLength() {
    return this.f.get('description').value.length;
  }

  get fileName() {
    const file = this.f.get('resume').value;
    return file ? file.name ? file.name : file.replace('https://knac-assets.s3.us-west-1.amazonaws.com/', '') : '';
  }

  get name(): AbstractControl {
    return this.f.get('name');
  }

  get lastName(): AbstractControl {
    return this.f.get('lastName');
  }

  get photo(): AbstractControl {
    return this.f.get('photo');
  }

  get skill(): AbstractControl {
    return this.f.get('skills');
  }

  get websiteUrl(): AbstractControl {
    /*
    if(this.f.get('websiteUrl') == ''){
      return null;
    }else{
      return this.f.get('websiteUrl');
    }*/

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

  get track(): AbstractControl {
    return this.f.get('track');
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
