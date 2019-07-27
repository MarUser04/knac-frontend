import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'prf-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  @Input() companies: any;
  pageOfItems: any;
  isMobile: boolean = false;
  index: number = -1;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.setIsMobile(result.matches);
      });
  }

  ngOnInit() {}

  onChangePage(pageOfItems: any) {
    this.pageOfItems = pageOfItems;
    this.index = -1;
  }

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
  }

  showExpansion(i) {
    this.index === i ? (this.index = -1) : (this.index = i);
  }

  redirectTo(name) {
    name = name.replace(/\s/g, '');
    this.router.navigate([`/professional/companies/${name}`]);
  }
}
