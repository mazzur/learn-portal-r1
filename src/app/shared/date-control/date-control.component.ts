import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'lp-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateControlComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DateControlComponent,
      multi: true
    }
  ],
})
export class DateControlComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() id = '';
  date = '';
  propagateChange: any;
  onTouched: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange(e: any) {
    this.date = e.target.value;
    this.propagateChange(this.date);
    this.onTouched();
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.date = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  validate(ctrl: AbstractControl) {
    return Validators.pattern('^\\d{2}\\/\\d{2}\\/\\d{4}$')(ctrl);
  }
}
