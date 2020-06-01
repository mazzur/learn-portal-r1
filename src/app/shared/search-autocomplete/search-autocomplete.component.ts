import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'lp-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss']
})
export class SearchAutocompleteComponent implements OnInit {
  @Input() suggestions = [];
  @Output() query = new EventEmitter();
  @Output() choose = new EventEmitter();
  @Output() inputBlur = new EventEmitter();
  @ViewChild('searchControl') searchControl: ElementRef;
  inputValue = '';

  constructor() { }

  ngOnInit(): void {
  }

  chooseSuggestion(value: string) {
    this.inputValue = '';
    this.choose.next(value);
  }

}
