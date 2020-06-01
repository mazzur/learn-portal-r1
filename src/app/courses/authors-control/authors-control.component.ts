import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { AuthorsService } from 'App/courses/authors-control/authors.service';
import { UnsubscribeOnDestroy } from 'App/core/unsubscribe-on-destroy';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearchAutocompleteComponent } from 'App/shared/search-autocomplete/search-autocomplete.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lp-authors-control',
  templateUrl: './authors-control.component.html',
  styleUrls: ['./authors-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AuthorsControlComponent),
    }
  ],
})
export class AuthorsControlComponent extends UnsubscribeOnDestroy implements OnInit, ControlValueAccessor {
  @ViewChild('searchAutocomplete') searchAutocomplete: SearchAutocompleteComponent;
  query$ = new Subject();
  suggestions: Array<string> = [];
  selectedAuthors: Array<string> = [];
  currentQuery = '';
  onChange: any;
  onTouched: any;

  constructor(private authorsService: AuthorsService) {
    super();
  }

  ngOnInit(): void {
    this.authorsService.suggestions$
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe(({ users, query }) => {
        if (this.currentQuery === query) {
          this.suggestions = users.filter(name => !this.selectedAuthors.includes(name));
        }
      });

    this.query$
      .pipe(
        debounceTime(300),
        filter((q: string) => q?.length > 1)
      ).subscribe((query: string) => {
      this.currentQuery = query;
      this.authorsService.findAuthors(query);
    });
  }

  writeValue(value: Array<string>): void {
    this.selectedAuthors = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  selectAuthor(author: string) {
    this.selectedAuthors.push(author);
    this.suggestions = [];
    this.onChange(this.selectedAuthors);
  }

  removeAuthor(author: string) {
    this.selectedAuthors = this.selectedAuthors.filter(name => name !== author);
    this.onChange(this.selectedAuthors);
  }

  focusInput() {
    this.searchAutocomplete.searchControl.nativeElement.focus();
  }

}
