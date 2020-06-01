import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'lp-duration-control',
  templateUrl: './duration-control.component.html',
  styleUrls: ['./duration-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DurationControlComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DurationControlComponent,
      multi: true
    }
  ],
})
export class DurationControlComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() id = '';
  duration: string | number = '';
  propagateChange: any;
  onTouched: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  onChange(e: any) {
    this.duration = e.target.value;
    this.propagateChange(this.duration);
    this.onTouched();
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: string | number): void {
    this.duration = value;
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  validate(ctrl: AbstractControl) {
    return Validators.pattern('^[0-9]*$')(ctrl);
  }
}
