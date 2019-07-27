import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Company } from '../../../../models/company';
import { CustomValidators } from '@app/validators/validators';
import {
  errorToast,
  readUploadedFileAsDataURL,
  warnToast
} from '@app/helpers/helper';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  // @Input() company: Company;
  // @Output() submitted = new EventEmitter<Company>();
  // @Input()
  // set disabled(isPending: boolean) {
  //   if (isPending) {
  //     this.pending = true;
  //     this.f.disable();
  //   } else {
  //     this.pending = false;
  //     this.f.enable();
  //   }
  // }
  // pending: boolean;
  // public showDialog: boolean;
  // f: FormGroup;
  // textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-]+$/;
  // showUpdate = false;
  // logoFile: File;
  // logoUrl: any;
  // logoError: boolean;
  // photosFile: File[] = [];
  // photosUrl: string[] = [];
  // videosFile: File[] = [];
  // videosUrl: string[] = [];
  // imageMaxSize = 6048;
  // constructor(private builder: FormBuilder, private toast: ToasterService) {
  //   this.f = this.builder.group(
  //     {
  //       name: ['', Validators.required],
  //       contactName: [
  //         '',
  //         [Validators.required, Validators.pattern(this.textPattern)]
  //       ],
  //       phone: [
  //         '',
  //         [
  //           Validators.required,
  //           CustomValidators.isNumber,
  //           Validators.maxLength(20),
  //           Validators.minLength(10)
  //         ]
  //       ],
  //       description: ['', Validators.required],
  //       numberOfEmployees: ['', [Validators.required, Validators.min(1)]],
  //       industry: ['', Validators.required],
  //       founded: ['', Validators.required],
  //       locations: ['', Validators.required],
  //       facebook: ['', [CustomValidators.isUrl]],
  //       twitter: ['', [CustomValidators.isUrl]],
  //       _id: ['']
  //     },
  //     { updateOn: 'submit' }
  //   );
  // }
  // // static validateFileUpload(e) {
  // //   if (e && e.target && e.target.files) {
  // //     const fileList = e.target.files;
  // //     return fileList.item(fileList.length - 1);
  // //   } else {
  // //     return null;
  // //   }
  // // }
  // // static validateFiles(e) {
  // //   if (e && e.target && e.target.files) {
  // //     const fileList = e.target.files;
  // //     return fileList;
  // //   } else {
  // //     return null;
  // //   }
  // // }
  ngOnInit() {}
  // @Input()
  // set modalUpdate(isModal: boolean) {
  //   if (!isModal) {
  //     this.showDialog = false;
  //   }
  // }
  // setForm() {
  //   const {
  //     name,
  //     contactName,
  //     logo,
  //     phone,
  //     description,
  //     numberOfEmployees,
  //     industry,
  //     founded: founded,
  //     locations,
  //     facebook,
  //     twitter,
  //     photos,
  //     videos
  //   } = this.company;
  //   this.f.patchValue(this.company);
  //   this.setProfileLogoUrl(logo);
  // }
  // updateProfile() {
  //   const {
  //     name,
  //     contactName,
  //     phone,
  //     description,
  //     numberOfEmployees,
  //     industry,
  //     founded,
  //     locations,
  //     facebook,
  //     twitter
  //   } = this.f.value;
  //   const payload = {
  //     name,
  //     contactName,
  //     logo: this.logoFile || '',
  //     phone,
  //     description,
  //     numberOfEmployees,
  //     industry,
  //     founded: founded.slice(0, 10),
  //     locations,
  //     facebook,
  //     twitter,
  //     photos: this.photosFile,
  //     videos: this.videosFile
  //   };
  //   if (this.f.valid) {
  //     this.submitted.emit(payload);
  //   }
  // }
  // isFileValid(field: string) {
  //   const f = this.f.get(field);
  //   return (!f.valid && f.touched) || (f.untouched && f);
  // }
  // openFileBrowser(e, name) {
  //   e.preventDefault();
  //   const element: HTMLElement = document.getElementById(name) as HTMLElement;
  //   element.click();
  // }
  // async onFileChangeLogo(e) {
  //   const file = UpdateProfileComponent.validateFileUpload(e);
  //   if (file.type.startsWith('image') && !file.type.endsWith('svg+xml')) {
  //     this.logoFile = file;
  //   }
  //   try {
  //     this.logoUrl = await readUploadedFileAsDataURL(file);
  //   } catch (e) {
  //     this.toast.pop(warnToast(e.message));
  //   }
  // }
  // setProfileLogoUrl(logo) {
  //   this.logoUrl = logo;
  // }
  // onFileChangePhotos(e) {
  //   const files = UpdateProfileComponent.validateFiles(e);
  //   if (!files) {
  //     return null;
  //   }
  //   Object.keys(files)
  //     .filter((i, index) => index < 3 - this.photosUrl.length)
  //     .filter(i => {
  //       const file = files[i];
  //       if (file.type.startsWith('image') && !file.type.endsWith('svg+xml')) {
  //         return file;
  //       }
  //     })
  //     .forEach(n => {
  //       if (files[n].size / 1024 < this.imageMaxSize) {
  //         this._transformImageAsDataUrl(files[n]);
  //       } else {
  //         this.toast.pop(
  //           errorToast(`Image: ${files[n].name.slice(0, 6)}... is too long!`)
  //         );
  //       }
  //     });
  // }
  // private _transformImageAsDataUrl(file: File) {
  //   this.photosFile = [...this.photosFile, file];
  //   readUploadedFileAsDataURL(file)
  //     .then((photo: string) => {
  //       this.photosUrl = [...this.photosUrl, photo];
  //     })
  //     .catch(e => {
  //       this.toast.pop(warnToast(e.message));
  //     });
  // }
  // deletePhoto(i) {
  //   this.photosUrl = [
  //     ...this.photosUrl.slice(0, i),
  //     ...this.photosUrl.slice(i + 1)
  //   ];
  //   this.photosFile = [
  //     ...this.photosFile.slice(0, i),
  //     ...this.photosFile.slice(i + 1)
  //   ];
  // }
  // deleteVideo(i) {
  //   this.videosUrl = [
  //     ...this.videosUrl.slice(0, i),
  //     ...this.videosUrl.slice(i + 1)
  //   ];
  //   this.videosFile = [
  //     ...this.videosFile.slice(0, i),
  //     ...this.videosFile.slice(i + 1)
  //   ];
  // }
  // onFileChangeVideos(e) {
  //   const files = UpdateProfileComponent.validateFiles(e);
  //   if (!files) {
  //     return null;
  //   }
  //   Object.keys(files)
  //     .filter((i, index) => index < 3 - this.videosUrl.length)
  //     .filter(i => {
  //       const file = files[i];
  //       if (file.type.startsWith('video')) {
  //         return file;
  //       }
  //     })
  //     .forEach(n => {
  //       const file = files[n];
  //       this.videosFile = [...this.videosFile, file];
  //       this.videosUrl = [...this.videosUrl, file.name];
  //     });
  // }
  // get name(): AbstractControl {
  //   return this.f.get('name');
  // }
  // get contactName(): AbstractControl {
  //   return this.f.get('contactName');
  // }
  // get phone(): AbstractControl {
  //   return this.f.get('phone');
  // }
  // get description(): AbstractControl {
  //   return this.f.get('description');
  // }
  // get numberOfEmployees(): AbstractControl {
  //   return this.f.get('numberOfEmployees');
  // }
  // get industry(): AbstractControl {
  //   return this.f.get('industry');
  // }
  // get founded(): AbstractControl {
  //   return this.f.get('founded');
  // }
  // get locations(): AbstractControl {
  //   return this.f.get('locations');
  // }
  // get facebook(): AbstractControl {
  //   return this.f.get('facebook');
  // }
  // get twitter(): AbstractControl {
  //   return this.f.get('twitter');
  // }
  // inputHasError(input: AbstractControl, submitted: boolean) {
  //   return input.invalid && (input.dirty || input.touched || submitted);
  // }
}
