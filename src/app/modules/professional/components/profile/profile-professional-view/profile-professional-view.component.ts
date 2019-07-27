import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Renderer2,
  ElementRef
} from '@angular/core';
import { Professional } from '@app/shared/models/professional';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import {
  errorToast,
  successToast,
  warnToast,
  infoToast,
  bodyParser,
  readUploadedFileAsDataURL
} from '@app/helpers/helper';
import { HandleErrorService } from '@app/services/handleError/handleError.service';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'prf-profile-professional-view',
  templateUrl: './profile-professional-view.component.html',
  styleUrls: ['./profile-professional-view.component.css']
})
export class ProfileProfessionalViewComponent implements OnInit {


  public isMobile;

  @Input() profile: any;
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() download: EventEmitter<any> = new EventEmitter<any>();
  @Input() pending: boolean;
  @Input()
  set mobal(mobal) {
    if (!mobal) {
      this.showDialog = false;
    }
  }

  showDialog = false;
  f: FormGroup;
  base64textString: any;
  pictures: File;
  textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-]+$/;
  action = '';
  pageOfPhoto: any;
  pageOfAssessments: any;

  @ViewChild('formUpdate') formUpdate;
  @ViewChild('addColapse') addColapse: ElementRef;


  constructor(
    private builder: FormBuilder,
    private message: HandleErrorService,
    private toast: ToasterService,
    private router: Router,
    private renderer: Renderer2

  ) {
    // private store: Store<fromAssessment.State>
    this.f = this.builder.group({
      id: [''],
      picture: ['', Validators.required],
      name: ['', [Validators.required, Validators.pattern(this.textPattern)]],
      description: ['', [Validators.required]]
    });
  }

  static validateFile(e) {
    if (e && e.target && e.target.files) {
      const fileList = e.target.files;
      return fileList.item(fileList.length - 1);
    } else {
      return null;
    }
  }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 800 ? true : false;
  }

  onResize(e) {
    if (e.target.innerWidth > 800) {
      this.isMobile = false;
    } else if (e.target.innerWidth <= 800) {
      this.isMobile = true;
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
    const file = ProfileProfessionalViewComponent.validateFile(e);
    this.f.get('picture').setValue(file);
    this.pictures = file;
    try {
      this.base64textString = await readUploadedFileAsDataURL(file);
    } catch (e) {
      this.toast.pop(warnToast(e.message));
    }
  }

  addPhoto() {
    if (this.action === 'Add') {
      const { id, ...data } = this.f.value;
      this.add.emit(data);
    } else {
      const { picture, ...data } = this.f.value;
      this.edit.emit(data);
    }
  }

  deletePhoto(id) {
    this.delete.emit(id);
  }

  downloadCV(url) {}

  setForm(item) {
    if (item) {
      this.f.patchValue({
        id: item._id,
        name: item.name,
        description: item.description
      });
      this.action = 'Edit';
      this.f.get('picture').setValidators([]);
      this.f.get('picture').updateValueAndValidity();
    } else {
      this.f.patchValue({
        id: '',
        name: '',
        description: ''
      });
      this.action = 'Add';
      this.f.get('picture').setValidators([Validators.required]);
      this.f.get('picture').updateValueAndValidity();
      this.base64textString = null;
      this.formUpdate.resetForm();
    }
    this.showDialog = !this.showDialog;
  }

  get picture(): AbstractControl {
    return this.f.get('picture');
  }

  get name(): AbstractControl {
    return this.f.get('name');
  }

  get description(): AbstractControl {
    return this.f.get('description');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }

  onChangePhoto(pageOfPhoto: any[]) {
    this.pageOfPhoto = pageOfPhoto;
  }

  onChangeAssessment(pageOfAssessments: any[]) {
    this.pageOfAssessments = pageOfAssessments;
  }
}
