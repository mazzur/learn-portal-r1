import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lp-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Output() confirm = new EventEmitter();
  @Output() dismiss = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
