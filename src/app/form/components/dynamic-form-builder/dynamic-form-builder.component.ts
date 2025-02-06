import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormConfigService } from '../../data-access/services/form-config.service';
import { FormField } from '../../data-access/models/form-response..interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dynamic-form-builder',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-form-builder.component.html',
  styleUrl: './dynamic-form-builder.component.scss',
})
export class DynamicFormBuilderComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  fb = inject(FormBuilder);
  formConfigService = inject(FormConfigService);
  formConfig = signal<FormField[]>([]);
  isLoading = signal<boolean>(false);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.getFormConfig();
    this.form = this.fb.group({});
  }

  getFormConfig() {
    this.isLoading.set(true);
    this.formConfigService
      .getFormConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config) => {
        this.formConfig.set(config.form.fields);
        this.createForm();
        this.isLoading.set(false);
      });
  }

  createForm(): void {
    this.formConfig().forEach((field) => {
      const validators = this.getValidators(field);
      this.form.addControl(field.name, this.fb.control('', validators));
    });
  }

  getValidators(field: FormField): any[] {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    if (field.regex) {
      validators.push(Validators.pattern(field.regex));
    }
    return validators;
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
