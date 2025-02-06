import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { FORM_CONFIG_URL } from '../../../app.config';
import { FormConfig } from '../models/form-response..interface';

@Injectable({ providedIn: 'root' })
export class FormConfigService extends ApiService {
  private configUrl = inject(FORM_CONFIG_URL);

  constructor() {
    super();
  }

  getFormConfig(): Observable<FormConfig> {
    return this.get<FormConfig>(this.configUrl);
  }
}
