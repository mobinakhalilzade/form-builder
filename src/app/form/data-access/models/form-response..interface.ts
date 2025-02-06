export interface FormConfig {
  id: string;
  form: Form;
  steps: number;
  current: number;
  fieldErrors: FieldErrors;
  errors: any[];
}

export interface Form {
  name: string;
  title: string;
  submitLabel: string;
  nestedFormShowType: string;
  fieldDescriptionShowType: string;
  fields: FormField[];
  forms: any[];
}

export interface FormField {
  '@type': string;
  name: string;
  title: string;
  description?: string;
  errorMessage: string;
  required: boolean;
  minLength: number;
  maxLength: number;
  type: string;
  descriptionShowType?: string;
  regex?: string;
  info?: string;
  showConfirmPassword?: boolean;
}

export interface FieldErrors {}
