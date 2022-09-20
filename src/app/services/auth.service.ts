import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, tap } from 'rxjs';
import { Login } from '../models/Login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Login> {
    return this.http
      .post<Login>(environment.apiUrl, { username, password })
      .pipe(
        tap((token) => {
          localStorage.setItem('authToken', JSON.stringify(token));
        }),
        shareReplay()
      );
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
