import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  http = inject(HttpClient);

  get<T>(url: string): Observable<T> {
    const headers = new HttpHeaders({
      Accept: 'application/json', // Ensure the server responds with JSON
    });

    return this.http.get<T>(url, { headers }).pipe(
      catchError((error) => {
        if (
          typeof error.error === 'string' &&
          error.error.includes('<!doctype html>')
        ) {
          console.error(
            'Received HTML instead of JSON. Check API or proxy configuration.'
          );
        } else {
          console.error('API returned:', error.error);
        }
        return throwError(() => new Error('Failed to fetch data'));
      })
    );
  }
}
