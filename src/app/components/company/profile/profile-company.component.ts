import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild
} from '@angular/core';
import { Company } from '@app/shared/models/company';
import { Assessment } from '@app/shared/models/assessment';
import { Job } from '@app/modules/company/models/job';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { CustomValidators } from '@app/validators/validators';
import {
  readUploadedFileAsDataURL,
  warnToast,
  errorToast
} from '@app/helpers/helper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cmp-profile',
  styleUrls: ['profile-company.component.css'],
  templateUrl: 'profile-company.component.html'
})
export class ProfileCompanyComponent implements OnInit, OnChanges {
  public isMobile: boolean;
  @ViewChild(SwiperComponent) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @Input()
  company: any;
  @Input()
  assessments: Assessment[];
  @Input()
  jobs: any[];
  @Input()
  tracks: any[];

  pageOfAssessment: Assessment[];
  pageOfJobs: any[];

  @Output() submitted = new EventEmitter<any>();
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

  @Input()
  set modalUpdate(isModal: boolean) {
    if (!isModal) {
      this.showDialog = false;
    }
  }

  @Input()
  set isEdit(isEdit) {
    if (isEdit.edit) {
      this.showDialog = true;
      this.setForm();
    }
  }
  pending: boolean;
  public showDialog: boolean;
  f: FormGroup;
  textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\'\s]+$/;
  showUpdate = false;

  logoFile: File;
  logoUrl = '/assets/images/user_placeholder.png';
  logoError: boolean;

  peoplePicturesFile: File[] = [];
  peoplePicturesUrl: string[] = [];
  peoplePicturesArry: any = [];

  photosFile: File[] = [];
  photosUrl: string[] = [];
  photosArry: any = [];

  videosFile: File[] = [];
  videosUrl: string[] = [];

  photos1 = '';
  photos2 = '';
  photos3 = '';
  photos1File: File = null;
  photos2File: File = null;
  photos3File: File = null;
  videos1 = '';
  videos2 = '';
  videos3 = '';
  videos1Url = '';
  videos2Url = '';
  videos3Url = '';
  videos1File: File = null;
  videos2File: File = null;
  videos3File: File = null;
  peoplePictures1 = '';
  peoplePictures2 = '';
  peoplePictures3 = '';
  peoplePictures1File: File = null;
  peoplePictures2File: File = null;
  peoplePictures3File: File = null;

  imageMaxSize = 6048;

  photosMobile = [];
  picturesMobile = [];

  constructor(
    private builder: FormBuilder,
    private toast: ToasterService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.f = this.builder.group(
      {
        name: ['', Validators.required],
        contactName: [
          '',
          [Validators.pattern(this.textPattern), Validators.required]
        ],
        phone: [
          '',
          [
            CustomValidators.isNumber,
            Validators.required,
            Validators.maxLength(20),
            Validators.minLength(10)
          ]
        ],
        aboutUs: ['', Validators.required],
        ourPeople: ['', Validators.required],
        companySize: ['', [Validators.min(1), Validators.required]],
        industry: ['', Validators.required],
        founded: ['', Validators.required],
        locations: ['', Validators.required],
        facebook: ['', [CustomValidators.isUrl]],
        twitter: ['', [CustomValidators.isUrl]],
        _id: [''],
        websiteUrl: ['', CustomValidators.isUrl]
      },
      { updateOn: 'submit' }
    );

    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.setIsMobile(result.matches);
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

  static validateFiles(e) {
    if (e && e.target && e.target.files) {
      const fileList = e.target.files;
      return fileList;
    } else {
      return null;
    }
  }

  onChangePageAssessment(pageOfItems: Assessment[]) {
    this.pageOfAssessment = pageOfItems;
  }

  onChangePageJobs(pageOfItems: any[]) {
    this.pageOfJobs = pageOfItems;
  }

  onResize(e) {
    if (e.target.innerWidth > 800) {
      this.isMobile = false;
    } else if (e.target.innerWidth <= 800) {
      this.isMobile = true;
    }
  }

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
  }

  track(i) {
    return this.tracks.find(track => track._id === this.jobs[i].track).name;
  }

  ngOnInit() {
    this.isMobile = window.innerWidth <= 800 ? true : false;
    if (this.company.profile) {
      this.photosMobile = ['photos1', 'photos2', 'photos3']
        .map(key => this.company.profile[key])
        .filter(photo => photo !== '');

      this.picturesMobile = [
        'peoplePictures1',
        'peoplePictures2',
        'peoplePictures3'
      ]
        .map(key => this.company.profile[key])
        .filter(pictures => pictures !== '');
      console.log(this.picturesMobile);
    }
  }

  ngOnChanges() {
    if (this.company.profile && !this.showDialog) {
      this.photosMobile = ['photos1', 'photos2', 'photos3']
        .map(key => this.company.profile[key])
        .filter(photo => photo !== '');

      this.picturesMobile = [
        'peoplePictures1',
        'peoplePictures2',
        'peoplePictures3'
      ]
        .map(key => this.company.profile[key])
        .filter(pictures => pictures !== '');
    }
  }

  setForm() {
    const {
      name,
      contactName,
      logo,
      phone,
      aboutUs,
      companySize,
      industry,
      founded: founded,
      locations,
      facebook,
      twitter,
      photos,
      videos,
      ourPeople,
      photos1,
      photos2,
      photos3,
      peoplePictures1,
      peoplePictures2,
      peoplePictures3,
      video1,
      video2,
      video3,
      videos1,
      videos2,
      videos3,
      websiteUrl
    } = this.company.profile;
    this.f.patchValue(this.company.profile);
    this.setProfileLogoUrl(logo);
    // our people
    this.peoplePictures1 = peoplePictures1;
    this.peoplePictures2 = peoplePictures2;
    this.peoplePictures3 = peoplePictures3;
    // about us
    this.photos1 = photos1;
    this.photos2 = photos2;
    this.photos3 = photos3;
    // video
    this.videos1 = video1;
    this.videos2 = video2;
    this.videos3 = video3;
    this.videos1Url = videos1;
    this.videos2Url = videos2;
    this.videos3Url = videos3;
  }

  updateProfile() {
    const {
      name,
      contactName,
      phone,
      aboutUs,
      companySize,
      industry,
      founded,
      locations,
      facebook,
      twitter,
      ourPeople,
      websiteUrl
    } = this.f.value;

    const video1 = this.videos1
      ? this.videos1.substring(0, this.videos1.indexOf('.mp4'))
      : '';
    const video2 = this.videos2
      ? this.videos2.substring(0, this.videos2.indexOf('.mp4'))
      : '';
    const video3 = this.videos3
      ? this.videos3.substring(0, this.videos3.indexOf('.mp4'))
      : '';
    const payload = {
      name,
      contactName,
      logo:
        this.logoUrl && !this.logoFile
          ? this.logoUrl || ''
          : this.logoFile || '',
      phone,
      aboutUs,
      ourPeople,
      companySize,
      industry,
      founded: founded.slice(0, 10),
      locations,
      facebook,
      twitter,
      websiteUrl,
      peoplePictures: this.peoplePicturesArry,
      videos: this.videosFile,
      video1: video1 === '' ? this.videos1 : video1,
      video2: video2 === '' ? this.videos2 : video2,
      video3: video3 === '' ? this.videos3 : video3,
      photos1:
        this.photos1 && !this.photos1File
          ? this.photos1 || ''
          : this.photos1File || '',
      photos2:
        this.photos2 && !this.photos2File
          ? this.photos2 || ''
          : this.photos2File || '',
      photos3:
        this.photos3 && !this.photos3File
          ? this.photos3 || ''
          : this.photos3File || '',
      peoplePictures1:
        this.peoplePictures1 && !this.peoplePictures1File
          ? this.peoplePictures1 || ''
          : this.peoplePictures1File || '',
      peoplePictures2:
        this.peoplePictures2 && !this.peoplePictures2File
          ? this.peoplePictures2 || ''
          : this.peoplePictures2File || '',
      peoplePictures3:
        this.peoplePictures3 && !this.peoplePictures3File
          ? this.peoplePictures3 || ''
          : this.peoplePictures3File || '',
      videos1:
        this.videos1Url && !this.videos1File
          ? this.videos1Url || ''
          : this.videos1File || '',
      videos2:
        this.videos2Url && !this.videos2File
          ? this.videos2Url || ''
          : this.videos2File || '',
      videos3:
        this.videos3Url && !this.videos3File
          ? this.videos3Url || ''
          : this.videos3File || ''
    };
    this.photos1File = null;
    this.photos2File = null;
    this.photos3File = null;
    this.peoplePictures1File = null;
    this.peoplePictures2File = null;
    this.peoplePictures3File = null;
    this.videos1File = null;
    this.videos2File = null;
    this.videos3File = null;
    this.submitted.emit(payload);
    this.photosMobile = [];
    this.picturesMobile = [];
  }

  isFileValid(field: string) {
    const f = this.f.get(field);
    return (!f.valid && f.touched) || (f.untouched && f);
  }

  openFileBrowser(e, name) {
    e.preventDefault();

    const element: HTMLElement = document.getElementById(name) as HTMLElement;
    element.click();
  }

  async onFileChangeLogo(e) {
    const file = ProfileCompanyComponent.validateFileUpload(e);
    if (file.type.startsWith('image') && !file.type.endsWith('svg+xml')) {
      this.logoFile = file;
    }
    try {
      this.logoUrl = (await readUploadedFileAsDataURL(file)) as string;
    } catch (e) {
      this.toast.pop(warnToast(e.message));
    }
  }

  setProfileLogoUrl(logo) {
    this.logoUrl = logo;
  }

  onFileChangePhotos(e, name) {
    const files = ProfileCompanyComponent.validateFiles(e);
    if (!files) {
      return null;
    }
    Object.keys(files)
      .filter(i => {
        const file = files[i];
        if (file.type.startsWith('image') && !file.type.endsWith('svg+xml')) {
          return file;
        }
      })
      .forEach(n => {
        if (files[n].size / 1024 < this.imageMaxSize) {
          this._transformImageAsDataUrl(files[n], name);
        } else {
          this.toast.pop(
            errorToast(`Image: ${files[n].name.slice(0, 6)}... is too long!`)
          );
        }
      });
  }

  onFileChangePeoplePictures(e, name) {
    const files = ProfileCompanyComponent.validateFiles(e);
    if (!files) {
      return null;
    }
    Object.keys(files)
      .filter(i => {
        const file = files[i];
        if (file.type.startsWith('image') && !file.type.endsWith('svg+xml')) {
          return file;
        }
      })
      .forEach(n => {
        if (files[n].size / 1024 < this.imageMaxSize) {
          this._transformImageAsDataUrl(files[n], name);
        } else {
          this.toast.pop(
            errorToast(`Image: ${files[n].name.slice(0, 6)}... is too long!`)
          );
        }
      });
  }

  private _transformImageAsDataUrl(file: File, name: string) {
    if (name === 'photos1') {
      this.photos1File = file;

      readUploadedFileAsDataURL(file)
        .then((photo: string) => {
          this.photos1 = photo;
        })
        .catch(e => {
          this.toast.pop(warnToast(e.message));
        });
    } else if (name === 'photos2') {
      this.photos2File = file;

      readUploadedFileAsDataURL(file)
        .then((photo: string) => {
          this.photos2 = photo;
        })
        .catch(e => {
          this.toast.pop(warnToast(e.message));
        });
    } else if (name === 'photos3') {
      this.photos3File = file;

      readUploadedFileAsDataURL(file)
        .then((photo: string) => {
          this.photos3 = photo;
        })
        .catch(e => {
          this.toast.pop(warnToast(e.message));
        });
    } else if (name === 'peoplePictures1') {
      this.peoplePictures1File = file;

      readUploadedFileAsDataURL(file)
        .then((photo: string) => {
          this.peoplePictures1 = photo;
        })
        .catch(e => {
          this.toast.pop(warnToast(e.message));
        });
    } else if (name === 'peoplePictures2') {
      this.peoplePictures2File = file;

      readUploadedFileAsDataURL(file)
        .then((photo: string) => {
          this.peoplePictures2 = photo;
        })
        .catch(e => {
          this.toast.pop(warnToast(e.message));
        });
    } else if (name === 'peoplePictures3') {
      this.peoplePictures3File = file;

      readUploadedFileAsDataURL(file)
        .then((photo: string) => {
          this.peoplePictures3 = photo;
        })
        .catch(e => {
          this.toast.pop(warnToast(e.message));
        });
    }
  }

  deletePhoto(name) {
    if (name === 'photos1') {
      this.photos1 = '';
      this.photos1File = null;
    } else if (name === 'photos2') {
      this.photos2 = '';
      this.photos2File = null;
    } else if (name === 'photos3') {
      this.photos3 = '';
      this.photos3File = null;
    }
  }

  deletePeoplePictures(name) {
    if (name === 'peoplePictures1') {
      this.peoplePictures1 = '';
      this.peoplePictures1File = null;
    } else if (name === 'peoplePictures2') {
      this.peoplePictures2 = '';
      this.peoplePictures2File = null;
    } else if (name === 'peoplePictures3') {
      this.peoplePictures3 = '';
      this.peoplePictures3File = null;
    }
  }

  deleteVideo(name) {
    if (name === 'videos1') {
      this.videos1 = '';
      this.videos1Url = '';
      this.videos1File = null;
    } else if (name === 'videos2') {
      this.videos2 = '';
      this.videos2Url = '';
      this.videos2File = null;
    } else if (name === 'videos3') {
      this.videos3 = '';
      this.videos3Url = '';
      this.videos3File = null;
    }
  }

  onFileChangeVideos(e, name) {
    const files = ProfileCompanyComponent.validateFiles(e);
    if (!files) {
      return null;
    }
    if (files[0].type === 'video/mp4') {
      Object.keys(files)
        .filter(i => {
          const file = files[i];
          if (file.type.startsWith('video')) {
            return file;
          }
        })
        .forEach(n => {
          const file = files[n];
          if (name === 'videos1') {
            this.videos1 = file.name;
            this.videos1File = file;
          } else if (name === 'videos2') {
            this.videos2 = file.name;
            this.videos2File = file;
          } else if (name === 'videos3') {
            this.videos3 = file.name;
            this.videos3File = file;
          }
        });
    } else {
      this.toast.pop(warnToast('Please select MP4 format files!'));
    }
  }

  get name(): AbstractControl {
    return this.f.get('name');
  }

  get contactName(): AbstractControl {
    return this.f.get('contactName');
  }

  get phone(): AbstractControl {
    return this.f.get('phone');
  }

  get aboutUs(): AbstractControl {
    return this.f.get('aboutUs');
  }

  get ourPeople(): AbstractControl {
    return this.f.get('ourPeople');
  }

  get companySize(): AbstractControl {
    return this.f.get('companySize');
  }

  get industry(): AbstractControl {
    return this.f.get('industry');
  }

  get founded(): AbstractControl {
    return this.f.get('founded');
  }

  get locations(): AbstractControl {
    return this.f.get('locations');
  }

  get facebook(): AbstractControl {
    return this.f.get('facebook');
  }

  get twitter(): AbstractControl {
    return this.f.get('twitter');
  }

  get websiteUrl(): AbstractControl {
    return this.f.get('websiteUrl');
  }

  getPictureName(name: any = '', file: File) {
    if (file) {
      name =  file.name.replace('https://knac-assets.s3.us-west-1.amazonaws.com/', '');

      if (name.length > 12 ) {

        if (this.isMobile) {
          name = name.substr(0, 8) + '...';
        } else {
          name = name.substr(0, 12) + '...';
        }


      }

      return name;
    } else if (name) {

      name =  name.replace('https://knac-assets.s3.us-west-1.amazonaws.com/', '');

      if (this.isMobile) {
        name = name.substr(0, 8) + '...';
      } else {
        name = name.substr(0, 12) + '...';
      }

      return name;
    }
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
