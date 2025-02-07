import { Component } from '@angular/core';
import { DynamicFormBuilderComponent } from "../../components/dynamic-form-builder/dynamic-form-builder.component";
import { FooterComponent } from "../../../main/footer/footer.component";

@Component({
  selector: 'app-form',
  imports: [DynamicFormBuilderComponent, FooterComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

}
