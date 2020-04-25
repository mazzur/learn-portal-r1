import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'lp-courses-search-control',
  templateUrl: './courses-search-control.component.html',
  styleUrls: ['./courses-search-control.component.scss']
})
export class CoursesSearchControlComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  searchValue = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
    this.searchValue.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((value: string) => this.search.emit(value));
  }

}
