import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'custom-captcha',
  templateUrl: './captcha.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CaptchaComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: CaptchaComponent,
      multi: true
    }
  ],
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit, ControlValueAccessor {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  answer: number;
  valid = false;
  onChange = (v) => { };
  onTouched = () => { };

  ngOnInit() {
    this.createCaptcha();
  }

  writeValue(value) { }

  validate({ value }: FormControl) {
    const isNotValid = this.answer !== Number(value);
    return isNotValid && {
      invalid: true
    };
  }

  registerOnChange(fn) { this.onChange = fn; }
  registerOnTouched(fn) { this.onTouched = fn; }

  createCaptcha() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const [numOne, numTwo] = [random(), random()];
    this.answer = numOne + numTwo;

    ctx.font = '30px Arial';
    ctx.fillText(`${numOne} + ${numTwo} = `, 10, 35);
  }

  change(value: string) {
    this.onChange(value);
    this.onTouched();
  }

}

function random() {
  return Math.floor(Math.random() * 10) + 1;
}
