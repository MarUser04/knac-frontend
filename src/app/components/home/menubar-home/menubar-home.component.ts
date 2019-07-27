import { Component, OnInit, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'hm-menubar-home',
  templateUrl: './menubar-home.component.html',
  styleUrls: ['./menubar-home.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0, 0, 0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(0, -100%, 0)',
          display: 'none'
        })
      ),
      state(
        'closeSlide',
        style({
          transform: 'translate3d(0, 0, 0)'
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
      transition('out => closeSlide', animate('0.5ms ease-in-out'))
    ])
  ]
})
export class MenubarHomeComponent implements OnInit {
  public menuState;
  public isMobile;

  constructor() {}

  ngOnInit() {
    this.menuState = window.innerWidth > 800 ? 'in' : 'out';
    this.isMobile = window.innerWidth <= 800 ? true : false;
  }

  onResize(e) {
    if (e.target.innerWidth > 800) {
      this.menuState = 'closeSlide';
      this.isMobile = false;
    } else if (e.target.innerWidth <= 800) {
      this.menuState = 'out';
      this.isMobile = true;
    }
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }



  @HostListener('document:click', ['$event'])
  clickedOutside($event) {
    if (window.innerWidth <= 800) {
      this.menuState = 'out';
    }
  }
}
