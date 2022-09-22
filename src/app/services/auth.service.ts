import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';
import { ChartData } from '../models/ChartData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private subject = new BehaviorSubject<User>({ username: '', password: '' });
  user$: Observable<User> = this.subject.asObservable();

  chartData: ChartData[];

  constructor(private http: HttpClient) {
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

  isUserTokenExist() {
    const token = localStorage.getItem('authToken');

    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.subject.next({ username: '', password: '' });
    localStorage.removeItem('authToken');
  }

  getDashboardData() {
    return this.http.get<ChartData>(environment.dashboardApi);
  }
}
