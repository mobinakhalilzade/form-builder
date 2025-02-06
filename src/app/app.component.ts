import { Component } from '@angular/core';
import { FormComponent } from './form/features/form/form.component';

@Component({
  selector: 'app-root',
  imports: [FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'form-builder';
}
