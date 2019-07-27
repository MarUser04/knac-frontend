import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Professional } from '@app/shared/models/professional';

@Component({
  selector: 'adm-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit {
  @Input() professionals: any;
  @Output() disabledEnabled: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteCompanyById: EventEmitter<any> = new EventEmitter<any>();
  route: string;
  pageOfItems: any;
  constructor() {}

  ngOnInit() {
    this.linkToProfessional();
  }

  linkToProfessional() {}

  onChangePage(pageOfItems: any) {
    this.pageOfItems = pageOfItems;
  }

  disabledEnabledUser(id) {
    this.disabledEnabled.emit(id);
  }

  deleteCompany(id: string) {
    this.deleteCompanyById.emit(id);
  }
}
