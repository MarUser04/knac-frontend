import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'prf-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnChanges {
  @Input() company: any;
  @Input() assessmentByCompany: any;
  @Input() jobByCompany: any;
  @Input()
  tracks: any[];
  pageOfAssessment: any;
  pageOfJobs: any;
  isMobile: boolean = false;
  photosMobile = [];
  picturesMobile = [];

  constructor(private breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.setIsMobile(result.matches);
      });
  }

  ngOnInit() {}

  ngOnChanges() {
    if (this.isMobile && this.company) {
      if (this.company.photos1 && this.photosMobile.length < 1) {
        this.photosMobile.push(this.company.photos1);
      }
      if (this.company.photos2 && this.photosMobile.length < 2) {
        this.photosMobile.push(this.company.photos2);
      }
      if (this.company.photos3 && this.photosMobile.length < 3) {
        this.photosMobile.push(this.company.photos3);
      }
      if (this.company.peoplePictures1 && this.picturesMobile.length < 1) {
        this.picturesMobile.push(this.company.peoplePictures1);
      }
      if (this.company.peoplePictures2 && this.picturesMobile.length < 2) {
        this.picturesMobile.push(this.company.peoplePictures2);
      }
      if (this.company.peoplePictures3 && this.picturesMobile.length < 3) {
        this.picturesMobile.push(this.company.peoplePictures3);
      }
    }
  }

  setIsMobile(isMobile) {
    this.isMobile = isMobile;
  }

  onChangePageAssessment(pageOfItems: any[]) {
    this.pageOfAssessment = pageOfItems;
  }

  onChangePageJobs(pageOfItems: any[]) {
    this.pageOfJobs = pageOfItems;
  }

  trackJobs(i) {
    return this.tracks.find(track => track._id === this.jobByCompany[i].track)
      .name;
  }

  trackAssessment(i) {
    return this.tracks.find(
      track => track._id === this.assessmentByCompany[i].track
    ).name;
  }
}
