import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lp-page-switcher',
  templateUrl: './page-switcher.component.html',
  styleUrls: ['./page-switcher.component.scss']
})
export class PageSwitcherComponent {
  @Input() page = 0;
  @Input() numberOfPages: number;
  @Output() pageChange = new EventEmitter<number>();

  get pages() {
    return Array.from(new Array(this.numberOfPages).keys());
  }

  changePage(page: number) {
    this.pageChange.emit(page);
  }

}
