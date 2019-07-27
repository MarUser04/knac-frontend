import { Component, OnInit, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'st-menubar-register',
  templateUrl: './menubar-register.component.html',
  styleUrls: ['./menubar-register.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translate3d(0, 0, 0)'
        })
      ),
      state(
        'out',
        style({
          transform: 'translate3d(100%, 0, 0)'
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
export class MenubarRegisterComponent implements OnInit {
  menuState;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.menuState = window.innerWidth > 800 ? 'in' : 'out';
  }

  onResize(e) {
    if (e.target.innerWidth > 800) {
      this.menuState = 'closeSlide';
    } else if (e.target.innerWidth <= 800) {
      this.menuState = 'out';
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

  logout(e) {
    e.preventDefault();
    this.auth.logout();
  }
}
