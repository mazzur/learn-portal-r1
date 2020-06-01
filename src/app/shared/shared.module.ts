import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DurationPipe } from './duration.pipe';
import { PageSizeSwitcherComponent } from './page-size-switcher/page-size-switcher.component';
import { PageSwitcherComponent } from './page-switcher/page-switcher.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DurationControlComponent } from './duration-control/duration-control.component';
import { DateControlComponent } from './date-control/date-control.component';
import { SearchAutocompleteComponent } from './search-autocomplete/search-autocomplete.component';


@NgModule({
  declarations: [
    DurationPipe,
    PageSizeSwitcherComponent,
    PageSwitcherComponent,
    ConfirmationModalComponent,
    DurationControlComponent,
    DateControlComponent,
    DateControlComponent,
    SearchAutocompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    DurationPipe,
    PageSizeSwitcherComponent,
    PageSwitcherComponent,
    ConfirmationModalComponent,
    FormsModule,
    DurationControlComponent,
    DateControlComponent,
    SearchAutocompleteComponent,
  ]
})
export class SharedModule {
}
