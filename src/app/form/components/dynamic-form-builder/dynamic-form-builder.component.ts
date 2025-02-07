import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormConfigService } from '../../data-access/services/form-config.service';
import {
  FormConfig,
  FormField,
} from '../../data-access/models/form-response..interface';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { AuthPages } from '../../data-access/consts/auth-pages.const';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dynamic-form-builder',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './dynamic-form-builder.component.html',
  styleUrl: './dynamic-form-builder.component.scss',
})
export class DynamicFormBuilderComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  fb = inject(FormBuilder);
  formConfigService = inject(FormConfigService);
  formConfig = signal<FormConfig>({} as FormConfig);
  isLoading = signal<boolean>(false);
  hide = signal(true);
  private destroy$ = new Subject<void>();
  authPages = signal<{ title: string; path: string }[]>(AuthPages);

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
        this.formConfig.set(config);
        this.createForm();
        this.isLoading.set(false);
      });
  }

  createForm(): void {
    this.formConfig().form.fields.forEach((field) => {
      const validators = this.getValidators(field);
      const control = this.fb.control('', validators);

      control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        this.updateValidators(control, field, value || '');
      });

      this.form.addControl(field.name, control);
    });
  }

  updateValidators(control: any, field: FormField, value: string): void {
    const updatedValidators = [];

    if (field.required) updatedValidators.push(Validators.required);
    if (value.length < field.minLength)
      updatedValidators.push(Validators.minLength(field.minLength));
    if (value.length > field.maxLength)
      updatedValidators.push(Validators.maxLength(field.maxLength));
    if (field.regex) updatedValidators.push(Validators.pattern(field.regex));
    console.log(updatedValidators, field, control);

    control.setValidators(updatedValidators);
    control.updateValueAndValidity({ emitEvent: false });
  }

  getValidators(field: FormField): any[] {
    const validators = [];
    if (field.required) validators.push(Validators.required);
    if (field.minLength) validators.push(Validators.minLength(field.minLength));
    if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
    if (field.regex) validators.push(Validators.pattern(field.regex));
    return validators;
  }

  hidePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
    event.preventDefault();
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
