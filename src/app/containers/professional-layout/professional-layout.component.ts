import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professional-layout',
  templateUrl: './professional-layout.component.html',
  styleUrls: ['./professional-layout.component.css']
})
export class ProfessionalLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public onActivate() {
    window.scroll(0, 0);
  }
}
