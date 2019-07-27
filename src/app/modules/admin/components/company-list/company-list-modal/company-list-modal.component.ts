import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { CustomValidators } from '@app/validators/validators';
import { Company } from '@app/modules/admin/models/company';

@Component({
  selector: 'adm-company-list-modal',
  templateUrl: './company-list-modal.component.html',
  styleUrls: ['./company-list-modal.component.css']
})
export class CompanyListModalComponent implements OnInit {
  @Input() type: string;

  @Input()
  set company(company: Company) {
    if (company) {
      this.f.patchValue(company);
    }
  }

  @Input()
  set setLoading(isLoading: boolean) {
    if (isLoading) {
      this.f.disable();
    } else {
      this.f.enable();
      if (this.type === 'Create' && this.loading) {
        this.formUpdate.resetForm();
      }
    }
    this.loading = isLoading;
  }

  @Output() submitted: EventEmitter<Company> = new EventEmitter<Company>();

  @ViewChild('formUpdate') formUpdate;

  public f: FormGroup;
  textPattern = /^[A-Za-zñáéíóúÑÁÉÍÓÚüÜ;\'\s\-]+$/;
  public loading: boolean;

  constructor(private builder: FormBuilder) {
    this.f = this.builder.group({
      _id: [''],
      name: ['', [Validators.required, Validators.pattern(this.textPattern)]],
      lastName: [
        '',
        [Validators.required, Validators.pattern(this.textPattern)]
      ],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, , CustomValidators.isEmail]],
      phone: [
        '',
        [
          Validators.required,
          CustomValidators.isNumber,
          Validators.maxLength(20),
          Validators.minLength(10)
        ]
      ]
    });
  }

  ngOnInit() {}

  public submit() {
    if (this.f.valid) {
      this.submitted.emit(this.f.value);
    }
  }

  get name(): AbstractControl {
    return this.f.get('name');
  }

  get lastName(): AbstractControl {
    return this.f.get('lastName');
  }

  get companyName(): AbstractControl {
    return this.f.get('companyName');
  }

  get email(): AbstractControl {
    return this.f.get('email');
  }

  get phone(): AbstractControl {
    return this.f.get('phone');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}
