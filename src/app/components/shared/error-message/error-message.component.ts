import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sh-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
  @Input() hasError: boolean;
  @Input() text: string;
  @Input() strongText: string;
  @Input() customStyle: string;
}
