import { Component } from '@angular/core';
import { FormComponent } from './form/features/form/form.component';
import { FooterComponent } from "./main/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [FormComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'form-builder';
}
