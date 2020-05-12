import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type PageSize = 3 | 6;
export type PageSizeOption = PageSize | 'all';

@Component({
  selector: 'lp-page-size-switcher',
  templateUrl: './page-size-switcher.component.html',
  styleUrls: ['./page-size-switcher.component.scss']
})
export class PageSizeSwitcherComponent {
  pageSizeOptions = [
    { value: 3, viewValue: '3' },
    { value: 6, viewValue: '6' },
    { value: 'all', viewValue: 'All' }
  ];
  @Input() activeOption: PageSizeOption;
  @Output() activeOptionChange = new EventEmitter<PageSize>();

}
