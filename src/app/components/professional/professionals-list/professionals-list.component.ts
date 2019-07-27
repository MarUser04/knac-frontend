import { Component, OnInit, Input } from '@angular/core';
import { Professional } from '@app/shared/models/professional';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'prf-professionals-list',
  templateUrl: './professionals-list.component.html',
  styleUrls: ['./professionals-list.component.css']
})
export class ProfessionalsListComponent implements OnInit {
  @Input() professionals: Professional[];
  @Input() module: string;
  route: string;
  isMobile: boolean = false;
  pageOfItems: Professional[];
  index = -1;
  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.setIsMobile(result.matches);
      });
  }

  ngOnInit() {
    this.linkToProfessional();
  }

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
  }

  showExpansion(i) {
    console.log(i);
    this.index === i ? (this.index = -1) : (this.index = i);
  }

  linkToProfessional() {
    if (this.module === 'professional') {
      this.route = '/professional/public/';
    } else if (this.module === 'company') {
      this.route = '/company/professionals/';
    }
  }

  onChangePage(pageOfItems: Professional[]) {
    this.pageOfItems = pageOfItems;
    this.index = -1;
  }
}
