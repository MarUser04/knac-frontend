  import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    selector: 'adm-professional-profile',
    templateUrl: './professional-profile.component.html',
    styleUrls: ['./professional-profile.component.css']
  })
  export class ProfessionalProfileComponent implements OnInit {
    public isMobile;
    @Input() profile: any;
    @Output() add: EventEmitter<any> = new EventEmitter<any>();
    showDialog = false;
    f: FormGroup;
    base64textString: any;
    pictures: File;
    textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\.:'\s\-]+$/;
    pageOfPhoto: any;
    pageOfAssessments: any;
    constructor(
      private builder: FormBuilder,
      private message: HandleErrorService,
      private toast: ToasterService,
      private router: Router
    ) {
      // private store: Store<fromAssessment.State>
      this.f = this.builder.group({
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
      const file = ProfessionalProfileComponent.validateFile(e);
      this.f.get('picture').setValue(file);
      this.pictures = file;
      try {
        this.base64textString = await readUploadedFileAsDataURL(file);
      } catch (e) {
        this.toast.pop(warnToast(e.message));
      }
    }
    addPhoto() {
      this.add.emit(this.f.value);
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
