import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'forms-example';

  question = {
    id: 1,
    type: 'textInput',
    value: 'What is your favorite sport ? '
  };

  group = new FormGroup({
    special_input: new FormControl(),
    captcha: new FormControl()
  });
}
