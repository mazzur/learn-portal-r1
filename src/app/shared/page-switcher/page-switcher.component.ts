import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lp-page-switcher',
  templateUrl: './page-switcher.component.html',
  styleUrls: ['./page-switcher.component.scss']
})
export class PageSwitcherComponent {
  @Input() page = 1;
  @Input() numberOfPages: number;
  @Output() pageChange = new EventEmitter<number>();

  get pages() {
    return Array.from(new Array(this.numberOfPages).keys()).slice(1);
  }

  changePage(page: number) {
    this.pageChange.emit(page);
  }

}
