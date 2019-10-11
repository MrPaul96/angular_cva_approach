import { Component, OnInit, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  ValidationErrors,
  AbstractControl,
  Validators
} from '@angular/forms';
import _ from 'lodash';

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input-component.component.html',
  styleUrls: ['./custom-input-component.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomInputComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CustomInputComponent,
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() question: any;
  @Input() required: boolean;

  constructor() {}

  // The internal data model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later providesd
  // by the Control Value Accessor
  private onTouchedCallback: () => void = _.noop;
  private onChangeCallback: (_: any) => void = _.noop;

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  // validates the form, returns null when valid else the validation object
  // in this case we're checking if the json parsing has passed or failed from the onChange method
  validate(c: AbstractControl): ValidationErrors|null {
    return this.required ? Validators.requiredTrue(c) : null;
  }
}
