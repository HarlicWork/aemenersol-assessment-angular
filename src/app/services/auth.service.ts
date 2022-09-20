import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subject = new BehaviorSubject<User>({ username: '', password: '' });
  user$: Observable<User> = this.subject.asObservable();

  isLogin$: Observable<boolean>;
  isLogout$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLogin$ = this.user$.pipe(map((user) => !!user));
    this.isLogout$ = this.isLogin$.pipe(map((login) => !login));

    const token = localStorage.getItem('authToken');

    if (token) {
      this.subject.next(JSON.parse(token));
    }
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(environment.apiUrl, { username, password })
      .pipe(
        tap((token) => {
          this.subject.next(token);
          localStorage.setItem('authToken', JSON.stringify(token));
        }),
        shareReplay()
      );
  }

  logout() {
    this.subject.next({ username: '', password: '' });
    localStorage.removeItem('authToken');
  }
}
