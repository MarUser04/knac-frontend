import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'adm-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() disabledEnabled: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteCompanyById: EventEmitter<any> = new EventEmitter<any>();

  pageOfItems: any;
  showModal = false;
  f: FormGroup;

  @ViewChild('formUpdate') formUpdate;
  @Input() companies: any;
  @Input() loading;
  @Input() set toggle(t) {
    if (t) {
      this.showModal = false;
    }
  }

  constructor(private build: FormBuilder, private router: Router) {
    this.f = build.group({
      id: [''],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onChangePage(pageOfItems: any) {
    this.pageOfItems = pageOfItems;
  }

  redirectTo(name) {
    this.router.navigate([`/admin/companies/${name.replace(/\s/g, '')}`]);
  }

  disabledEnabledUser(id) {
    this.disabledEnabled.emit(id);
  }

  submit() {
    this.update.emit(this.f.value);
  }

  setForm(email, id) {
    this.f.patchValue({ email: email, id: id });
    this.showModal = !this.showModal;
  }

  get email(): AbstractControl {
    return this.f.get('email');
  }

  inputHasError(input: AbstractControl, submitted: boolean) {
    return input.invalid && (input.dirty || input.touched || submitted);
  }

  deleteCompany(id: string) {
    this.deleteCompanyById.emit(id);
  }
}
