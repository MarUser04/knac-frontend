import {
  Component,
  OnInit,
  Input,
  Inject,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl
} from '@angular/forms';

import { Company } from '@app/modules/admin/models/company';
import { CustomValidators } from '@app/validators/validators';
import { ANIMATION_TYPES } from 'ngx-loading';
import { delay } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import * as fromPage from '../../../reducers';
import * as PageActions from '../../../actions/page.actions';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'adm-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  // Simple Spinner
  @Input() loading: boolean;

  @Input() companies: Company[];

  @Output() create = new EventEmitter<Company>();

  @Output() delete = new EventEmitter<Company>();

  @Output() update = new EventEmitter<Company>();

  @Output() submitted = new EventEmitter<any>();

  @Output() createManually = new EventEmitter<Company>();

  private _filterQuery: string = String();

  public sortBy = 'name';
  public sortOrder = 'asc';
  public showCreate = false;
  public showUpdate = false;
  public isModal: boolean;

  public company: Company = {
    _id: '',
    name: '',
    lastName: '',
    email: '',
    companyName: '',
    phone: ''
  };

  public cols: any = [
    { field: 'name', header: 'Name' },
    { field: 'lastName', header: 'Lastname' },
    { field: 'email', header: 'Email' },
    { field: 'companyName', header: 'Company' },
    { field: 'phone', header: 'Phone' },
    { field: 'created', header: 'Date' },
    { field: 'action', header: 'Actions' }
  ];

  constructor(private store: Store<fromPage.State>) {}

  ngOnInit() {}

  @Input()
  set modalCreate(isModal: boolean) {
    if (!isModal) {
      this.showCreate = false;
    }
  }

  @Input()
  set modalUpdate(isModal: boolean) {
    if (!isModal) {
      this.showUpdate = false;
    }
  }

  public set sorting(value: string) {
    this._filterQuery = value;
  }

  public get sorting(): string {
    return this._filterQuery;
  }

  setForm(item: Company) {
    this.company = item;
  }

  updateCompany(data: Company) {
    this.update.emit(data);
  }

  createManuallys(data: Company) {
    this.createManually.emit(data);
  }

  createById(e) {
    this.create.emit(e);
  }

  deleteById(e) {
    this.delete.emit(e);
  }

  updateList() {
    this.update.emit();
  }

  trackCompany(index, company) {
    return company ? company._id : index;
  }

  public get totalRecords() {
    return this.companies.length;
  }
}
