import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type PageSize = 3 | 6 | 'all';

@Component({
  selector: 'lp-page-size-switcher',
  templateUrl: './page-size-switcher.component.html',
  styleUrls: ['./page-size-switcher.component.scss']
})
export class PageSizeSwitcherComponent {
  pageSizes = [
    { value: 3, viewValue: '3' },
    { value: 6, viewValue: '6' },
    { value: 'all', viewValue: 'All' }
  ];
  @Input() pageSize: PageSize;
  @Output() pageSizeChange = new EventEmitter<PageSize>();

}
