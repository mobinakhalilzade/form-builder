import { Component } from '@angular/core';
import { DynamicFormBuilderComponent } from "../../components/dynamic-form-builder/dynamic-form-builder.component";

@Component({
  selector: 'app-form',
  imports: [DynamicFormBuilderComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

}
