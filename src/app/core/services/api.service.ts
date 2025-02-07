import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  http = inject(HttpClient);

  get<T>(url: string): Observable<T> {
    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.get<T>(url, { headers });
  }
}
